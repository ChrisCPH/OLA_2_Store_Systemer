namespace Backend.Models
{
    public class Job
    {
        public int JobID { get; set; }
        public required string Type { get; set; }
        public required string Status { get; set; }
        public DateTime Date { get; set; }
    }
}