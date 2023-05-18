using AutoMapper;
using CollegeProject.DTO.Student;
using CollegeProject.Model;

namespace CollegeProject.MappingProfile
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
           CreateMap<Student, CreateStudentDto>().ReverseMap();
            CreateMap<Student, UpdateStudentDto>().ReverseMap();
        }
    }
}
