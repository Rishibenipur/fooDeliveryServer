import mongoose from 'mongoose';

const dataBaseconnection = async () => {
  try {
    await mongoose.connect(process.env.CONN_URL);
    console.log('Connected to Database');
  } catch (error) {
    console.log(error);
  }
};
export default dataBaseconnection;
