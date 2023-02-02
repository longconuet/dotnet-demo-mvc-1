using Microsoft.AspNetCore.Mvc;
using System;
using WebApplication4.Models;
using WebApplication4.Requests;

namespace WebApplication4.Controllers
{
    public class StudentController : Controller
    {
        public IActionResult Index()
        {
            using var db = new StudentDbContext();

            //var students = db.Students.ToList();

            return View();
        }

        public JsonResult List()
        {
            using var db = new StudentDbContext();

            var students = db.Students.ToList();

            return Json(students);
        }

        public IActionResult Create()
        {

            return View();
        }

        //[HttpPost]
        //public IActionResult Create(Student student)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(student);
        //    }

        //    using var db = new StudentDbContext();
        //    db.Students.Add(student);
        //    db.SaveChanges();

        //    return RedirectToAction("Index");
        //}

        [HttpPost]
        public JsonResult Create(AddStudentRequest request)
        {
            //if (!ModelState.IsValid)
            //{
            //    return View(student);
            //}

            using var db = new StudentDbContext();
            db.Students.Add(new Student
            {
                Name = request.Name,
                Age = request.Age
            });
            db.SaveChanges();

            return Json("Success");
        }

        public IActionResult Edit(int id)
        {
            using var db = new StudentDbContext();

            var student = db.Students.FirstOrDefault(x => x.Id == id);

            return View(student);
        }

        public JsonResult GetById(int id)
        {
            using var db = new StudentDbContext();

            var student = db.Students.FirstOrDefault(x => x.Id == id);

            return Json(student);
        }

        //[HttpPost]
        //public IActionResult Edit(Student student)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return View(student);
        //    }

        //    using var db = new StudentDbContext();

        //    var std = db.Students.Any(x => x.Id == student.Id);
        //    if (std)
        //    {
        //        db.Students.Update(student);
        //        db.SaveChanges();
        //    }

        //    return RedirectToAction("Index");
        //}

        [HttpPost]
        public JsonResult Update(UpdateStudentRequest request)
        {
            //if (!ModelState.IsValid)
            //{
            //    return View(student);
            //}

            using var db = new StudentDbContext();

            var std = db.Students.FirstOrDefault(x => x.Id == request.Id);
            if (std != null)
            {
                std.Name = request.Name;
                std.Age = request.Age;

                db.Students.Update(std);
                db.SaveChanges();
            }

            return Json("Success");
        }

        //public IActionResult Delete(int id)
        //{
        //    using var db = new StudentDbContext();

        //    var student = db.Students.FirstOrDefault(x => x.Id == id);
        //    if (student != null)
        //    {
        //        db.Students.Remove(student);
        //        db.SaveChanges();
        //    }

        //    return RedirectToAction("Index");
        //}

        [HttpPost]
        public JsonResult Delete(int id)
        {
            //if (!ModelState.IsValid)
            //{
            //    return View(student);
            //}

            using var db = new StudentDbContext();

            var std = db.Students.FirstOrDefault(x => x.Id == id);
            if (std != null)
            {
                db.Students.Remove(std);
                db.SaveChanges();
            }

            return Json("Success");
        }
    }
}
