import styles from "./styles/app.module.css";
import { TableLayout } from "./components/Table";
import { IoMdAdd } from "react-icons/io";
import { EntryCreateModal } from "./components/EntryCreateModal";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
  const [show, setShow] = useState(false);
  const [brokers, setBrokers] = useState("");
  const [load, setLoad] = useState(false);

  const handleClickModal = () => {
    setShow(true);
  };

  useEffect(() => {
    const formData = new FormData();
    formData.append("member_type", "broker");
    setLoad(true);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/get_brokers_underwriters`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setBrokers(res.data.users_data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setLoad(false);
      });
  }, []);

  return (
    <div className={styles.center}>
      <h1 className={styles.h1}>Broker</h1>
      <div className={styles.buttonDiv}>
        <button className={styles.btn} onClick={handleClickModal}>
          <span>
            <IoMdAdd className={styles.icon} />
          </span>
          <span>Add New</span>
        </button>
      </div>
      <TableLayout brokers={brokers} load={load}/>
      <EntryCreateModal
        show={show}
        setShow={setShow}
        brokers={brokers}
        setBrokers={setBrokers}
      />
    </div>
  );
}

export default App;
