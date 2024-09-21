namespace Backend.Models
{
    public class Chemical
    {
        public int ChemicalID { get; set; }
        public required string ChemicalType { get; set; }
        public required string Volatility { get; set; }
        public required string FireHazard { get; set; }
        public required string Volume { get; set; }

        public int WarehouseID { get; set; }
        public int JobID { get; set; }
    }
}