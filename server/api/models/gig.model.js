const connectDB = require("../config/db");

async function createGig(gigData) {
  const conn = await connectDB();

  try {
    const query = `
      INSERT INTO GIGS (WORKER_ID, TITLE, DESCRIPTION, PRICE, CATEGORY)
      VALUES (:workerId, :title, :description, :price, :category)
    `;

    const result = await conn.execute(
      query,
      {
        workerId: Number(gigData.workerId),   // ✅ force number
        title: gigData.title,
        description: gigData.description,
        price: Number(gigData.price),         // ✅ VERY IMPORTANT
        category: gigData.category,
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

module.exports = {
  createGig,
};