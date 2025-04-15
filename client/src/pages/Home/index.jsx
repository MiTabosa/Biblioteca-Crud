import api from "../../api";
import { useState, useEffect } from "react";

import "./style.css";

function Home() {
  const [books, setBooks] = useState([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchBooks(); // buscar livros
  }, []);

  const fetchBooks = async () => {
    try {
      const result = await api.get("/");
      setBooks(result.data);
    } catch (error) {
      console.error("Erro");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/updateItem/${editing.id}`, {
          title,
          author,
        });
        setEditing(null);
      } else {
        await api.post("/insert", {
          title,
          author
        });
      }
      setTitle("");
      setAuthor("");
      fetchBooks();
    } catch (error) {
      console.error("Erro ao inserir livro:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
     await api.delete(`/deleteItem/${id}`);
      fetchBooks();
    } catch (error) {
      console.error(`Erro ao apagar livro: ${error}`);
    }
  };

  const handleEdit = (book) => {
    setTitle(book.title);
    setAuthor(book.author);
    setEditing(book);
  };

  return (
    <>
      <h1>Inserir novo livro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titulo:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Autor:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">{editing ? 'Atualizar' : 'Inserir'}</button>
        {editing && <button type="button" onClick={() => setEditing(null)}>Cancelar</button>}
      </form>

      <h1>Tabela de livros</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>titulo</th>
            <th>Autor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Editar</button>
                <button onClick={() => handleDelete(book.id)}>Apagar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Home;
