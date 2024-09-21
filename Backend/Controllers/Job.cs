using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;

[Route("api/jobs")]
[ApiController]
public class JobController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public JobController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Job>>> GetJobs()
    {
        return await _context.Job.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Job>> GetJob(int id)
    {
        var job = await _context.Job.FindAsync(id);

        if (job == null)
        {
            return NotFound();
        }

        return job;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateJob(int id, Job job)
    {
        if (id != job.JobID)
        {
            return BadRequest();
        }

        _context.Entry(job).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!JobExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<Job>> CreateJob(Job job)
    {
        _context.Job.Add(job);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetJob), new { id = job.JobID }, job);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(int id)
    {
        var job = await _context.Job.FindAsync(id);
        if (job == null)
        {
            return NotFound();
        }

        _context.Job.Remove(job);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool JobExists(int id)
    {
        return _context.Job.Any(e => e.JobID == id);
    }
}

