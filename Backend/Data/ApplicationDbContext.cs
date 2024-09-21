using Microsoft.EntityFrameworkCore;
using Backend.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<Job> Job { get; set; }
    public DbSet<Chemical> Chemical { get; set; }
    public DbSet<Warehouse> Warehouse { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Job>(entity =>
            {
                entity.HasKey(j => j.JobID);
            });

            modelBuilder.Entity<Chemical>(entity =>
            {
                entity.HasKey(c => c.ChemicalID);
            });

            modelBuilder.Entity<Warehouse>(entity =>
            {
                entity.HasKey(w => w.WarehouseID);
            });
        }
}

