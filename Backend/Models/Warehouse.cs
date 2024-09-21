namespace Backend.Models
{
    public class Warehouse
    {
        public int WarehouseID { get; set; }
        public required string Capacity { get; set; }
        public required string AdjacentWarehouse { get; set; }
        public required string WarehouseName { get; set; }
    }
}