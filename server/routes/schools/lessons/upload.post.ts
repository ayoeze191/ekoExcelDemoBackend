import SchoolModel from "~~/model/School.model";
import path from "path";
import fs from "fs/promises";
import formidable from "formidable";
import response from "~~/utils/response";
import CourseModel from "~~/model/Course.model";
import LessonsModel from "~~/model/Lessons.model";
import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_CLOUD_NAME = "eccomerce-test";
const CLOUDINARY_API_KEY = "362528267371699";
const CLOUDINARY_API_SECRET = "8EdH21GS9tl_fMbUm0fmRQSFIZQ";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "lessons");

export default eventHandler({
  onRequest: [],
  async handler(event) {
    try {
      // Ensure the upload directory exists
      await fs.mkdir(UPLOAD_DIR, { recursive: true });
      console.log("Step1");

      const form = formidable({
        multiples: false,
        uploadDir: UPLOAD_DIR,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, // 5 MB
        filter: ({ mimetype }) => ["application/pdf"].includes(mimetype),
      });
      console.log("Step2");

      const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(event.node.req, (err, fields, files) => {
          if (err) reject(err);
          resolve({ fields, files });
        });
      });

      const lessonFile = files.lesson;
      const school = fields.school;
      const course = fields.course;
      const date = fields.date;
      console.log("Step4");

      if (!lessonFile) throw new Error("Lesson file is required.");
      if (!school) throw new Error("School ID is required.");
      if (!course) throw new Error("Course ID is required.");

      // Check if referenced school and course exist
      const schoolExists = await SchoolModel.findById(school);
      if (!schoolExists) throw new Error("School not found.");

      const courseExists = await CourseModel.findById(course);
      if (!courseExists) throw new Error("Course not found.");
      console.log("Step5", lessonFile);

      const lessonFilePath = lessonFile[0].filepath || null;

      if (!lessonFilePath) {
        throw new Error("Invalid file upload.");
      }

      // Upload to Cloudinary
      const cloudinaryResult = await cloudinary.uploader.upload(
        lessonFilePath,
        {
          resource_type: "auto", // Automatically detect file type (e.g., image, video, pdf)
          folder: "lessons", // Optional folder in Cloudinary
          use_filename: true,
          unique_filename: false,
          access_mode: "public",
        }
      );

      const lesson = new LessonsModel({
        pdf: cloudinaryResult.secure_url, // Save the Cloudinary URL
        school: school,
        course: course,
        date: date ? new Date(date) : new Date(), // Default to current date
      });

      await lesson.save();
      // Optionally delete the file from the local upload directory if needed
      // await fs.unlink(lessonFilePath);

      // Respond to the client
      return response.success(event, {
        message: "Lesson uploaded and saved successfully.",
      });
    } catch (error) {
      console.error(error);
      // Handle error (e.g., return error response)
    }
  },
});
