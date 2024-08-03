// // //

// // const request = require('supertest');
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const multer = require('multer');
// // const chai = require('chai');
// // const { expect } = chai;

// // // Import your routes and models
// // const profileRoutes = require('../routes/editProfileRouter'); // Adjust the path
// // const User = require('../models/user');

// // // Create an Express app and use the routes
// // const app = express();
// // app.use(express.json());
// // app.use('/api/profile', profileRoutes);

// // // Connect to the test database
// // before(async () => {
// //   await mongoose.connect('mongodb://localhost:27017/testdb', {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   });
// // });

// // // Close the connection after tests
// // after(async () => {
// //   await mongoose.connection.close();
// // });

// // // Test for changing username
// // describe('PUT /api/profile/change-username', () => {
// //   let userId;

// //   // Create a user before the test
// //   before(async () => {
// //     const user = new User({
// //       username: 'oldusername',
// //       email: 'test@example.com',
// //     });
// //     await user.save();
// //     userId = user._id;
// //   });

// //   it('should change the username', async () => {
// //     const res = await request(app)
// //       .put('/api/profile/change-username')
// //       .send({ newUsername: 'newusername', userId })
// //       .expect(200);

// //     expect(res.body.message).to.equal('Username updated successfully');
// //     const updatedUser = await User.findById(userId);
// //     expect(updatedUser.username).to.equal('newusername');
// //   });

// //   // Cleanup the user after tests
// //   after(async () => {
// //     await User.findByIdAndDelete(userId);
// //   });
// // });

// // // Test for changing profile photo
// // describe('POST /api/profile/change-profile-photo', () => {
// //   let userId;

// //   // Create a user before the test
// //   before(async () => {
// //     const user = new User({ username: 'username', email: 'test@example.com' });
// //     await user.save();
// //     userId = user._id;
// //   });

// //   it('should change the profile photo', async () => {
// //     const res = await request(app)
// //       .post('/api/profile/change-profile-photo')
// //       .attach('file', Buffer.from('dummy image content'), 'test-image.jpg')
// //       .field('userId', userId)
// //       .expect(200);

// //     expect(res.body.message).to.equal('Profile photo updated successfully');
// //     const updatedUser = await User.findById(userId);
// //     expect(updatedUser.googlePicture).to.match(
// //       /^http:\/\/localhost:5003\/api\/images\/.*\.jpeg$/
// //     );
// //   });

// //   // Cleanup the user after tests
// //   after(async () => {
// //     await User.findByIdAndDelete(userId);
// //   });
// // });

// const request = require('supertest');
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');

// // Import your routes and models
// const profileRoutes = require('../routes/editProfileRouter'); // Adjust the path
// const User = require('../models/user');

// // Create an Express app and use the routes
// const app = express();
// app.use(express.json());
// app.use('/api/profile', profileRoutes);

// // Connect to the test database
// before(async () => {
//   await mongoose.connect(
//     'mongodb+srv://ChengTong:e4Uu1ExS9L58jDIu@comp3900-hexahunks.db0uu6n.mongodb.net/?retryWrites=true&w=majority&appName=comp3900-HEXAHUNKS',
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     }
//   );
// });

// // Close the connection after tests
// after(async () => {
//   await mongoose.connection.close();
// });

// // Test for changing username
// describe('PUT /api/profile/change-username', () => {
//   let userId;

//   // Create a user before the test
//   before(async () => {
//     const user = new User({
//       username: 'oldusername',
//       email: 'test@example.com',
//     });
//     await user.save();
//     userId = user._id;
//   });

//   it('should change the username', async () => {
//     const res = await request(app)
//       .put('/api/profile/change-username')
//       .send({ newUsername: 'newusername', userId })
//       .expect(200);

//     expect(res.body.message).toBe('Username updated successfully');
//     const updatedUser = await User.findById(userId);
//     expect(updatedUser.username).toBe('newusername');
//   });

//   // Cleanup the user after tests
//   after(async () => {
//     await User.findByIdAndDelete(userId);
//   });
// });

// // Test for changing profile photo
// describe('POST /api/profile/change-profile-photo', () => {
//   let userId;

//   // Create a user before the test
//   before(async () => {
//     const user = new User({ username: 'username', email: 'test@example.com' });
//     await user.save();
//     userId = user._id;
//   });

//   it('should change the profile photo', async () => {
//     const res = await request(app)
//       .post('/api/profile/change-profile-photo')
//       .attach('file', Buffer.from('dummy image content'), 'test-image.jpg')
//       .field('userId', userId)
//       .expect(200);

//     expect(res.body.message).toBe('Profile photo updated successfully');
//     const updatedUser = await User.findById(userId);
//     expect(updatedUser.googlePicture).toMatch(
//       /^http:\/\/localhost:5003\/api\/images\/.*\.jpeg$/
//     );
//   });

//   // Cleanup the user after tests
//   after(async () => {
//     await User.findByIdAndDelete(userId);
//   });
// });

const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

// Import your routes and models
const profileRoutes = require('../routes/editProfileRouter'); // Adjust the path
const User = require('../models/user');

// Create an Express app and use the routes
const app = express();
app.use(express.json());
app.use('/api/profile', profileRoutes);

// Connect to the test database
beforeAll(async () => {
  await mongoose.connect(
    'mongodb+srv://ChengTong:e4Uu1ExS9L58jDIu@comp3900-hexahunks.db0uu6n.mongodb.net/?retryWrites=true&w=majority&appName=comp3900-HEXAHUNKS',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
});

// Close the connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

// Test for changing username
describe('PUT /api/profile/change-username', () => {
  let userId;

  // Create a user before the test
  beforeAll(async () => {
    const user = new User({
      username: 'oldusername',
      email: 'test@example.com',
    });
    await user.save();
    userId = user._id;
  });

  it('should change the username', async () => {
    const res = await request(app)
      .put('/api/profile/change-username')
      .send({ newUsername: 'newusername', userId })
      .expect(200);

    expect(res.body.message).toBe('Username updated successfully');
    const updatedUser = await User.findById(userId);
    expect(updatedUser.username).toBe('newusername');
  });

  // Cleanup the user after tests
  afterAll(async () => {
    await User.findByIdAndDelete(userId);
  });
});

// Test for changing profile photo
describe('POST /api/profile/change-profile-photo', () => {
  let userId;

  // Create a user before the test
  beforeAll(async () => {
    const user = new User({ username: 'username', email: 'test@example.com' });
    await user.save();
    userId = user._id;
  });

  it('should change the profile photo', async () => {
    const res = await request(app)
      .post('/api/profile/change-profile-photo')
      .attach('file', Buffer.from('dummy image content'), 'test-image.jpg')
      .field('userId', userId)
      .expect(200);

    expect(res.body.message).toBe('Profile photo updated successfully');
    const updatedUser = await User.findById(userId);
    expect(updatedUser.googlePicture).toMatch(
      /^http:\/\/localhost:5003\/api\/images\/.*\.jpeg$/
    );
  });

  // Cleanup the user after tests
  afterAll(async () => {
    await User.findByIdAndDelete(userId);
  });
});
