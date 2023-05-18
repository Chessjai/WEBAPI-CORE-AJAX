using System.ComponentModel.DataAnnotations;

namespace CollegeProject.DTO.Student
{
    public class CreateStudentDto
    {
        
        public string Name { get; set; }
        public int Address { get; set; }
        public int PhoneNumber { get; set; }
    }
}
