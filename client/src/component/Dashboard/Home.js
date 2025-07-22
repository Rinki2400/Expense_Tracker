
import { FaWallet, FaMoneyBillWave} from 'react-icons/fa';
import { GiPayMoney } from 'react-icons/gi'; 

import "../../style/Dashboard.css"

function Home() {
  return (
    <div className="right_dash_conatainer">
      <div className="top_container">
        <div className="card">
          <div className="icon purple"><FaWallet /></div>
          <div className="card_content">
            <p className="title">Total Balance</p>
            <h3>$91,100</h3>
          </div>
        </div>
        <div className="card">
          <div className="icon orange">
            <FaMoneyBillWave />
          </div>
          <div className="card_content">
            <p className="title">Total Income</p>
            <h3>$98,200</h3>
          </div>
        </div>
        <div className="card">
          <div className="icon red">
            <GiPayMoney/>
          </div>
          <div className="card_content">
            <p className="title">Total Expenses</p>
            <h3>$7,100</h3>
          </div>
        </div>
      </div>
      <div className="bottom_container">
        <div className="botton_card">
          <div className="left_card">1</div>
          <div className="right_card">2</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
