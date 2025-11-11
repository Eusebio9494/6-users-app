import useUsers from '../hooks/useUsers';

const FormPagination = () => {

    const {settingPageSize} = useUsers();
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const pageSize = Number(formData.get("size") || 6);
        console.log("Tamaño de Página:", pageSize);
        settingPageSize(pageSize);
    }
    return (
        <div>
            <h2 style={{ fontSize: '20px', color: 'black' }}>Elementos por página</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name='size' min="1" defaultValue="6" />
                <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z" />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg></button>
            </form>
        </div>
    );
}

export default FormPagination;
