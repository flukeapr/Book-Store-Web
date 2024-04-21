import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { db } from "../config/Firebase";
import {
  getCountFromServer,
  collection,
  getDocs,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Dashboard() {
  const [countUsers, setCountusers] = useState(0);
  const [countBooks, setCountbooks] = useState(0);
  const [countOrders, setCountorders] = useState(0);
  const [orderDetail, setOrderDetail] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState([]);
  const [bookSell, setBookSell] = useState([]);
  const [loadingPie , setLoadingPie] = useState(true);
  const [loadingBar , setLoadingBar] = useState(true);
  async function fetchCountUsers() {
    const coll = collection(db, "Users");
    const snapshot = await getCountFromServer(coll);

    setCountusers(snapshot.data().count);
  }
  async function fetchCountBooks() {
    const coll = collection(db, "Book");
    const snapshot = await getCountFromServer(coll);

    setCountbooks(snapshot.data().count);
  }
  async function fetchCountOrders() {
    const coll = collection(db, "Orders");
    const snapshot = await getCountFromServer(coll);

    setCountorders(snapshot.data().count);
  }
  const getOrderDetail = async () => {
    try {
      const coll = collection(db, "Orders");
      const q = query(coll, orderBy("date", "desc"), limit(3));
      const snapshot = await getDocs(q);

      const Order = [];
      snapshot.forEach((doc) => {
        Order.push(doc.data());
      });
      setOrderDetail(Order);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  };

  const getCat = async () => {
    try {
      const collRef = collection(db, "Book"); // เปลี่ยน your_collection_name เป็นชื่อ collection ที่ต้องการนับ category
      const snapshot = await getDocs(collRef);

      const counts = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        const category = data.category;

        if (category) {
          counts[category] = (counts[category] || 0) + 1;
        }
      });
//pie chart
setLoadingPie(false);
      setCategoryCounts(counts);
    } catch (error) {
      console.error("Error fetching category counts: ", error);
    }
  };
  const getOrderBook = async () => {
    try {
      const collRef = collection(db, "Orders");
      const snapshot = await getDocs(collRef);

      const bookSell = {};
      snapshot.forEach((doc) => {
        const data = doc.data();
        const bookName = data.book_name;
        if (bookName) {
          bookSell[bookName] = (bookSell[bookName] || 0) + 1;
        }
      });
      const data = Object.keys(bookSell).map((bookName) => ({
        name: bookName, // ชื่อของหนังสือ
        count: bookSell[bookName], // จำนวนของหนังสือ
      }));
      // bar chart
      setLoadingBar(false);
      // ตั้งค่าข้อมูลให้แผนภูมิ
      setBookSell(data);
    } catch (error) {
      console.error("Error fetching Order: ", error);
    }
  };

  useEffect(() => {
    getOrderBook();
    getCat();
    getOrderDetail();
    fetchCountOrders();
    fetchCountUsers();
    fetchCountBooks();
  }, []);
  const data = Object.keys(categoryCounts).map((category) => ({
    category,
    count: categoryCounts[category],
  }));

  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className=" flex   w-full h-44 m-4">
          <div className="card bg-white shadow-xl w-1/5 mx-2">
            <div className="flex flex-col h-fit   my-2 mx-2">
              <div className="btn btn-outline btn-primary w-1/3 text-sm rounded-full">
                ผู้ใช้งาน
              </div>
              <div className="text-5xl font-bold flex justify-center">
                {countUsers}
              </div>

              <Link
                className="text-red-900 text-lg flex  justify-end  my-8 mr-4"
                to="/dashboard/allusers"
              >
                view
              </Link>
            </div>
          </div>

          <div className="card bg-white shadow-xl w-1/5 mx-2">
            <div className="flex flex-col h-fit   my-2 mx-2">
              <div className="btn btn-outline btn-primary w-1/4 text-sm rounded-full">
                หนังสือ
              </div>
              <div className="text-5xl font-bold flex justify-center">
                {countBooks}
              </div>

              <Link
                className="text-red-900 text-lg flex  justify-end  my-8 mr-4"
                to="/dashboard/allbooks"
              >
                view
              </Link>
            </div>
          </div>
          <div className="card bg-white shadow-xl w-3/5 mx-2">
            <div className="flex flex-col h-fit   my-2 mx-2">
              <div className="btn btn-outline btn-primary w-24 text-sm rounded-full">
                คำสั่งซื้อ
              </div>
              <div className="text-5xl font-bold flex justify-center">
                {countOrders}
              </div>

              <Link
                className="text-red-900 text-lg flex  justify-end  my-8 mr-4"
                to="/dashboard/orderDetail"
              >
                view
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center  w-full  ">
        <div className="card bg-white shadow-xl w-3/5 h-[600px]  mx-2">
          <div className="flex flex-col h-fit   my-2 mx-2">
            <div className="btn btn-outline btn-primary w-1/4 text-sm rounded-full">
              จำนวนหนังสือที่ถูกซื้อ
            </div>
            {loadingBar?(
            <div className="flex justify-center items-center h-[500px]">
               
<span className="loading loading-bars loading-lg bg-primary"></span>
            </div>
            ):(
              <BarChart
              width={1000}
              height={500}
              data={bookSell}
              margin={{
                top: 25,
                right: 30,
                left: 40,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#8C0327"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            </BarChart>
            )}
            
          </div>
        </div>
        <div className="flex flex-col">
          <div className="card bg-white shadow-xl w-[670px] h-1/2  mx-2">
            <div className="flex flex-col h-fit   my-2 mx-2">
              <div className="btn btn-outline btn-primary w-1/4 text-sm rounded-full">
                ประเภทหนังสือ
              </div>
             {loadingPie?(
               <div className="flex justify-center items-center h-[200px]">
                  <span className="loading loading-bars loading-lg bg-primary"></span>
                </div>
             ):(
              <div className="flex justify-center">
                 <PieChart width={250} height={250}>
                          <Pie
                            data={data}
                            dataKey="count"
                            nameKey="category"
                            cx="50%"
                            cy="40%"
                            outerRadius={80}
                            fill="#8C0327"
                            label
                          ></Pie>
                          <Tooltip />
                        </PieChart>
              </div>
       
                    
             )}
                
            </div>
          </div>
          <div className="card bg-white shadow-xl w-[670px] h-1/2 my-2 mx-2">
            <div className="flex flex-col h-fit   my-2 mx-2">
              <div className="btn btn-outline btn-primary w-1/4 text-sm rounded-full">
                คำสั่งซื้อล่าสุด
              </div>
              <div className="overflow-x-auto border-solid border-2 rounded-xl m-2">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Receiver</th>
                      <th>Book</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {orderDetail.map((details) => (
                      <tr key={details.id}>
                        <td>{details.receiver}</td>
                        <td>{details.book_name}</td>
                        <td>{details.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
