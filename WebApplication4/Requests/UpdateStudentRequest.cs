namespace WebApplication4.Requests
{
    public class UpdateStudentRequest
    {
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public int Age { get; set; }
    }
}
