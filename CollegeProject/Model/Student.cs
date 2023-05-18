using System.ComponentModel.DataAnnotations;

namespace CollegeProject.Model
{
    public class Student
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public int Address { get; set; }
        public int PhoneNumber { get; set; }
    }
}
