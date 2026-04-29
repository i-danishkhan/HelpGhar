const connectDB = require("../config/db");
const oracledb = require("oracledb");

async function createGig(gigData) {
  const conn = await connectDB();

  try {
    const query = `
      INSERT INTO GIGS (WORKER_ID, TITLE, DESCRIPTION, PRICE, CATEGORY, IMAGE)
      VALUES (:workerId, :title, :description, :price, :category, :image)
    `;

    const result = await conn.execute(
      query,
      {
        workerId: Number(gigData.workerId),
        title: gigData.title,
        description: gigData.description,
        price: Number(gigData.price),
        category: gigData.category,
        image: gigData.image || null,
      },
      { autoCommit: true }
    );

    return result;

  } catch (err) {
    console.error("❌ MODEL ERROR:", err);
    throw err;
  } finally {
    await conn.close();
  }
}

async function getAllGigs() {
  const conn = await connectDB();

  try {
    const result = await conn.execute(
      `SELECT GIG_ID, WORKER_ID, TITLE, DESCRIPTION, PRICE, CATEGORY, IMAGE, CREATED_AT
       FROM GIGS
       ORDER BY CREATED_AT DESC`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );

    return result.rows;

  } catch (err) {
    console.error("❌ MODEL ERROR (getAllGigs):", err);
    throw err;
  } finally {
    await conn.close();
  }
}

module.exports = {
  createGig,
  getAllGigs,
};