using CollegeProject.Model;
using Microsoft.EntityFrameworkCore;

namespace CollegeProject.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options)
        {
            
        }

        public DbSet<Student> Students { get; set; }
    }
}
