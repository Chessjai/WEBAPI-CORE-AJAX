using AutoMapper;
using CollegeProject.Data;
using CollegeProject.DTO.Student;
using CollegeProject.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CollegeProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        IMapper _mapper;
        public StudentController(ApplicationDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Student> students=new List<Student>();
            students = _db.Students.ToList();
            return Ok(students);
        }

        [HttpGet("{id:int}")]
        public IActionResult Get(int id) 
        {
            Student student=_db.Students.FirstOrDefault(x => x.Id == id);
            return Ok(student);
        }

        [HttpPost]
        public IActionResult Create(CreateStudentDto createStudentDto)
        {
            var student = _mapper.Map<Student>(createStudentDto);
             _db.Add(student);
            _db.SaveChanges();
            return Ok(student);  
        }

        [HttpPut("{id:int}")]
        public IActionResult Edit(int id,[FromBody] UpdateStudentDto updateStudentDto) 
        {
            if(updateStudentDto==null || id != updateStudentDto.Id)
            {
                return BadRequest(ModelState);
            }
            var student=_mapper.Map<Student>(updateStudentDto);
            _db.Update(student);
            _db.SaveChanges();
            return Ok(student);
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            if(id==null)
                {
                return BadRequest(ModelState);
            }
            var student = _db.Students.FirstOrDefault(_x => _x.Id == id);
            _db.Remove(student);
            _db.SaveChanges();
            return Ok();
        }
    }
}
