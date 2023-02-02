namespace WebApplication4.ModalViews
{
    public class PagedStudentModal
    {
        public List<StudentModal> Students { get; set; } = new List<StudentModal>();
        public int TotalCount { get; set;}
        public int TotalItem { get; set;}
        public int TotalPage { get; set;}
        public int PageSize { get; set;}
        public int PageCurrent { get; set;}

    }
}
