const express = require("express");
const cors = require("cors");

const {
  getAllItems,
  insertItem,
  updateItem,
  deleteItem,
} = require("./allitems");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`funcionando na porta ${PORT}`);
});

// rota para buscar todos os itens

app.get("/", async (req, res) => {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/insert", async (req, res) => {
  const { title, author } = req.body;
  try {
    const result = await insertItem(title, author);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/updateItem/:id", async (req, res) => {
  const { id } = req.params;
  const {title, author} = req.body;
  try {
    const result = await updateItem(id, title, author);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  app.delete("/deleteItem/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const result = await deleteItem(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});
