using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/chemicals")]
[ApiController]
public class ChemicalController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ChemicalController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Chemical>>> GetChemicals()
    {
        return await _context.Chemical.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Chemical>> GetChemical(int id)
    {
        var chemical = await _context.Chemical.FindAsync(id);

        if (chemical == null)
        {
            return NotFound();
        }

        return chemical;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateChemical(int id, Chemical chemical)
    {
        if (id != chemical.ChemicalID)
        {
            return BadRequest();
        }

        _context.Entry(chemical).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ChemicalExists(id))
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
    public async Task<ActionResult<Chemical>> CreateChemical(Chemical chemical)
    {
        _context.Chemical.Add(chemical);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetChemical), new { id = chemical.ChemicalID }, chemical);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteChemical(int id)
    {
        var chemical = await _context.Chemical.FindAsync(id);
        if (chemical == null)
        {
            return NotFound();
        }

        _context.Chemical.Remove(chemical);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ChemicalExists(int id)
    {
        return _context.Chemical.Any(e => e.ChemicalID == id);
    }
}
