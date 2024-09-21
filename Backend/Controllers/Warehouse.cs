using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/warehouses")]
[ApiController]
public class WarehouseController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public WarehouseController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Warehouse>>> GetWarehouses()
    {
        return await _context.Warehouse.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Warehouse>> GetWarehouse(int id)
    {
        var warehouse = await _context.Warehouse.FindAsync(id);

        if (warehouse == null)
        {
            return NotFound();
        }

        return warehouse;
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateWarehouse(int id, Warehouse warehouse)
    {
        if (id != warehouse.WarehouseID)
        {
            return BadRequest();
        }

        _context.Entry(warehouse).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!WarehouseExists(id))
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
    public async Task<ActionResult<Warehouse>> CreateWarehouse(Warehouse warehouse)
    {
        _context.Warehouse.Add(warehouse);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetWarehouse), new { id = warehouse.WarehouseID }, warehouse);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteWarehouse(int id)
    {
        var warehouse = await _context.Warehouse.FindAsync(id);
        if (warehouse == null)
        {
            return NotFound();
        }

        _context.Warehouse.Remove(warehouse);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool WarehouseExists(int id)
    {
        return _context.Warehouse.Any(e => e.WarehouseID == id);
    }
}
