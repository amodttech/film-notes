const express = require("express");
const router = express.Router();

const Entry = require("./models/Entry");
const Prompt = require("./models/Prompt");

//Entries
router.get("/entries", async (req, res) => {
  const entries = await Entry.find();
  res.send(entries);
});

router.get("/entries/:id", async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id });
    res.send(entry);
  } catch {
    res.status(404);
    res.send({ error: "could not find entry" });
  }
});

router.post("/entries", async (req, res) => {
  const entry = new Entry({
    title: req.body.title,
    content: req.body.content,
    prompt: null,
    tags: req.body.tags,
  });
  await entry.save();
  res.send(entry);
});

router.patch("/entries/:id", async (req, res) => {
  try {
    const entry = await Entry.findOne({ _id: req.params.id });

    if (req.body.title) {
      entry.title = req.body.title;
    }
    if (req.body.content) {
      entry.content = req.body.content;
    }

    if (req.body.tags) {
      entry.tags = req.body.tags;
    }

    await entry.save();
    res.send(entry);
  } catch {
    res.status(404);
    res.send({ error: "could not find entry" });
  }
});

router.delete("/entries/:id", async (req, res) => {
  try {
    await Entry.findByIdAndRemove({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "could not find entry" });
  }
});

//Prompts
router.get("/prompts", async (req, res) => {
  const prompts = await Prompt.find();
  res.send(prompts);
});

router.get("/prompts/:id", async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ _id: req.params.id });
    res.send(prompt);
  } catch {
    res.status(404);
    res.send({ error: "could not find prompt" });
  }
});

router.post("/prompts", async (req, res) => {
  const prompt = new Prompt({
    prompt: req.body.prompt,
  });
  await prompt.save();
  res.send(prompt);
});

router.patch("/prompts/:id", async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ _id: req.params.id });

    if (req.body.prompt) {
      prompt.prompt = req.body.prompt;
    }

    await prompt.save();
    res.send(prompt);
  } catch {
    res.status(404);
    res.send({ error: "could not find prompt" });
  }
});

router.delete("/prompts/:id", async (req, res) => {
  try {
    await Prompt.findByIdAndRemove({ _id: req.params.id });
    res.status(204).send();
  } catch {
    res.status(404);
    res.send({ error: "could not find prompt" });
  }
});

module.exports = router;
