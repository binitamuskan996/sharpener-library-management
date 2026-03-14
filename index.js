const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./utils/db-connection');
const bcrypt = require('bcrypt');
const index=require('./models/index')
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const User = require('./models/userModel');
const adminRoutes = require('./routes/adminRoutes');

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/auth', authRoutes);
app.use('/books', bookRoutes);
app.use('/admin', adminRoutes);

async function seedAdmin() {
  const adminEmail = "admin@library.com";
  const existing = await User.findOne({ where: { email: adminEmail } });

  if (!existing) {
    const hash = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Super Admin",
      email: adminEmail,
      password: hash,
      role: "admin"
    });
  }
}
sequelize.sync() 
  .then(async() => {
    await seedAdmin();
    app.listen(3000, () => {
      console.log('Server running on http://localhost:3000');
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
