import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import FontSarabun from "../../../fonts/Sarabun-Regular.ttf";
import FontSarabunBold from "../../../fonts/Sarabun-ExtraBold.ttf";
import FontSarabunLight from "../../../fonts/Sarabun-ExtraBold.ttf";
import Prompt from "../../../fonts/Prompt-Regular.ttf";
import Mitr from "../../../fonts/Mitr-Regular.ttf";
import { useState, useEffect } from "react";
import p01 from '../../../images/รูปอาม่า01.png'
import p02 from '../../../images/รูปอากง02.png'

import { PDFViewer } from "@react-pdf/renderer";
import THBText from 'thai-baht-text'

import { GiCancel } from "react-icons/gi";

import axios from "axios";

Font.register({
  family: "Sarabun",
  src: FontSarabun,
});
Font.register({
  family: "SarabunBold",
  src: FontSarabunBold,
});
Font.register({
  family: "SarabunLight",
  src: FontSarabunLight,
});
Font.register({
  family: "Prompt",
  src: Prompt,
});
Font.register({
  family: "Mitr",
  src: Mitr,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    // backgroundColor: "ffff",
    padding: 20,
    margin: 1,
    fontFamily: "SarabunLight",
  },
  header1: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 100,
  },
  header: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  body: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  footer: {
    fontSize: 12,
    textAlign: "left",
    marginBottom: 10,
  },
  signature: {
    fontSize: 12,
    textAlign: "left",
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
  },
  flexrowbetween: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    wordBreak: "break-word"
    
  },
  flexrowcenter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  flexrowend: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "center",
  },
  flexrowstart: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    textAlign: "left",
  },
  textsm: {
    fontSize: 12,
  },
  textbase: {
    fontSize: 16,
  },
  textlg: {
    fontSize: 18,
  },
  textxl: {
    fontSize: 24,
    fontFamily: "SarabunBold",
    fontWeight: "bold",
  },
  spacesm: {
    marginRight: 5,
  },
  spacemd: {
    marginRight: 20,
  },
  fontbase: {
    fontSize: 14,
    fontWeight: "normal",
    fontFamily: "SarabunLight",
  },
  fontbold: {
    fontSize: 18,
    fontWeight: "bold",
  },

  imageContainer: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
    wordBreak: "break-word"
  },
  image: {
    width: 70,
    height: 70,
  },
  image1: {
    width: 90,
    height: 90,
  },
  mtsm: {
    marginTop: 10,
    wordBreak: "break-word"
  },
  mtsm20: {
    marginTop: 20,
    wordBreak: "break-word"
  },
  mtmd: {
    marginTop: 30,
  },
  underlineText: {
    textDecoration: "underline",
    textDecorationStyle: "dot",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell1: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "7%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell2: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "49%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "auto",
  },
  tableCell3: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell4: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell5: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "12%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell6: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "12%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellsum: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "56%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
});


const BillPay_Sale = ({ open5, handleOpen5, data, statusModal  }) => {

  const [dataPay, setDataPay] = useState({})

  const fethDataPay = async()=>{
    if (data.id_receipt){
      try {
        const res = await axios.get(`${import.meta.env.VITE_APP_API}/Receipt/${data.id_receipt}/detail`)
        // console.log(res.data[0]);
        setDataPay(res.data[0])
        
      } catch (error) {
        console.error(error);
      }
    }
  }


  useEffect(() => {
    // console.log(data);
    fethDataPay()
  }, [open5]);

  console.log(dataPay)

  const currentDate = new Date();

  const buddhistYear = currentDate.getFullYear() + 543;
  // console.log(buddhistYear);
  //  --------------- แปลงรูปแบบวันที่ วว/ดด/ปป -------------------------------- //
  const dateObject = new Date(dataPay?.sale_receipt_date_pay);

  // รับค่าวันที่, เดือน, และปี
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // เดือนจะนับเริ่มต้นที่ 0, เพิ่ม 1 เพื่อเป็นเดือนที่ถูกต้อง
  const year = dateObject.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็น พ.ศ.

  // สร้างรูปแบบวันที่ใหม่ "dd/mm/yyyy"
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;


    const productPrices = (dataPay?.products || []).map(product => {
      const count = parseInt(product.sale_auction_start_event_count);
      const price = parseInt(product.sale_auction_start_event_count_price);
      return count * price;
    });
  
    // คำนวณผลรวมของราคาทั้งหมด
    const totalPrice = productPrices.reduce((acc, currentPrice) => acc + currentPrice, 0);

    // console.log(totalPrice)



  
  return (
    <div>
      <Dialog open={open5} size="xl" handler={handleOpen5}>
        <DialogHeader> 
            บิลที่ {data?.sale_code} 
            {statusModal == "1" && " ( เครื่องพิมพ์หัวเข็ม ) "}
            {statusModal == "2" && " ( เครื่องพิมพ์ธรรมดา ) "}

            </DialogHeader>
            <DialogBody divider>
           
           <PDFViewer width="100%" height="600px">
           <Document>
           <Page size="A4" style={styles.page} >
              <View style={styles.flexrowbetween}>
                <View style={styles.flexrow}>
                  <Text style={[styles.textsm, styles.spacesm]}>{""} </Text>
                  <Text
                    style={[
                      styles.textbase,
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      {color:"red"},
                    ]}
                  >
                    ต้นฉบับ{" "}
                  </Text>
                </View>
                <View style={styles.flexrow}>
                  <Text style={[styles.textsm, styles.spacesm]}>เลขที่ </Text>
                  <Text
                    style={[
                      styles.textsm,
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                    ]}
                  >
                    {dataPay?.sale_code}
                  </Text>
                </View>
              </View>
              <View style={[styles.imageContainer, styles.flexrow]}>
                <Image
                  // src="../../../public/img/รูปอาม่า01.png"
                  src={p01}
                  style={styles.image}
                />
                <Image 
                // src="../../../public/img/รูปอากง02.png" 
                src={p02}
                style={styles.image} />
              </View>
              <View>
                <Text
                  style={[
                    styles.flexrowcenter,
                    styles.textbase,
                    { fontWeight: "thin" },
                  ]}
                >
                  ใบเสร็จ{" "}
                </Text>
                <Text style={[styles.flexrowcenter, styles.textbase, styles.mtsm]}>
                  คณะกรรมการจัดงานศาลเจ้าปึงเถ่ากงม่า ขอนแก่น{" "}
                </Text>
                <View style={styles.flexrowcenter}>
                <Text
                  style={[
                    styles.flexrowcenter,
                    styles.textsm,
                    { fontWeight: "thin", marginTop:"7px" },
                  ]}
                >
                    ประจำปี{" "}
                  </Text>
                  <Text
                  style={[
                    styles.flexrowcenter,
                    styles.textsm,
                    { fontWeight: "thin" , marginTop:"7px" },
                  ]}
                >
                    {buddhistYear}
                  </Text>
                </View>
                <View style={styles.flexrow}>
                  <View style={[
                    styles.flexrowstart,
                    {width:"70%"}
                    ]}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      ชื่อผู้บริจาค:{" "}
                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        {width:""},
                        styles.mtsm,
                      ]}
                    >
                      {dataPay?.sale_code_customer_name}{" "}
                    </Text>
                  </View>
  
                  <View style={[
                    styles.flexrow,
                    {width:"30%"}
                    ]}>
                    <View style={styles.flexrowstart}>
                      <Text
                        style={[
                          { fontWeight: "extrabold" },
                          { fontFamily: "SarabunBold" },
                          { fontSize: "11" },
                          styles.mtsm,
                          styles.spacesm,
                        ]}
                      >
                        ชำระโดย:{" "}
                      </Text>
                      <Text
                        style={[
                          { fontWeight: "light" },
                          { fontFamily: "Sarabun" },
                          { fontSize: "11" },
                          styles.mtsm,
                          styles.spacesm,
                        ]}
                      >
                        {" "}{dataPay?.sale_receipt_status == 1 ? "เงินสด" : dataPay?.sale_receipt_status == 2 ? "เงินโอน" : dataPay?.sale_receipt_status == 3 ? "เช็ค" : "" }
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.flexrow}>
                  <View style={[
                    styles.flexrowstart,
                    {width:"70%"}
                    ]}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      ที่อยู่:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.mtsm,
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        { display:"flex"},
                        { width:"80%"},
                      ]}
                    >
                      {dataPay?.sale_code_customer_address}{" "}
                    </Text>
                  </View>
  
                  <View style={[
                    styles.flexrow,
                    {width:"30%"}
                    ]}>
                  <View style={styles.flexrowstart}>
                      <Text
                        style={[
                          { fontWeight: "extrabold" },
                          { fontFamily: "SarabunBold" },
                          { fontSize: "11" },
                          styles.mtsm,
                          styles.spacesm,
                        ]}
                      >
                        วันที่รับชำระ:{" "}
                      </Text>
                      <Text
                        style={[
                          { fontWeight: "light" },
                          { fontFamily: "Sarabun" },
                          { fontSize: "11" },
                          styles.mtsm,
                          styles.spacesm,
                        ]}
                      >
                        {" "}
                        {formattedDate || ''}.
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.flexrow}>
                <View style={[
                    styles.flexrowstart,
                    {width:"70%"}
                    ]}>
                      <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      ออกสลากในนาม:{" "}
                    </Text>
                    <Text
                      style={[
                        styles.mtsm,
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        { display:"flex"},
                        { width:"80%"},
                      ]}
                    >
                      {dataPay?.sale_code_customer_noun + '' }.{" "} 
                    </Text>
                  </View>
  
                  <View style={[
                    styles.flexrow,
                    {width:"30%"}
                    ]}>
                    <View style={styles.flexrowstart}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    บิลอ้างอิงเล่มที่:
                  </Text>
                  <Text
                    style={[
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                 
                 {dataPay?.sale_auction_refer} 
                  </Text>
                </View>
              <View style={styles.flexrowstart}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    เล่มที่:
                  </Text>
                  <Text
                    style={[
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    {" "}
                    {dataPay?.sale_auction_num}
                  </Text>
                </View>
                  </View>
                </View>
                <View style={styles.flexrow}>
                <View style={[
                    styles.flexrowstart,
                    {width:"70%"}
                    ]}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      ผู้ติดต่อ:{" "}
                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        {display:"flex"},
                        { width:"80%"},
                        styles.mtsm,
                      ]}
                    >
                    {dataPay?.sale_code_customer_contract}{" "}
                    </Text>
                  </View>
  
                  <View style={[
                styles.flexrow,
                {width:"30%"}
                ]}>
                  <View style={styles.flexrowstart}>
                      <Text
                        style={[
                          { fontWeight: "extrabold" },
                          { fontFamily: "SarabunBold" },
                          { fontSize: "11" },
                          styles.mtsm,
                          styles.spacesm,
                        ]}
                      >
                        เบอร์โทรศัพท์:{" "}
                      </Text>
                      <Text
                        style={[
                          { fontWeight: "light" },
                          { fontFamily: "Sarabun" },
                          { fontSize: "11" },
                          styles.mtsm,
                          styles.spacesm,
                        ]}
                      >
                        {" "}
                        {dataPay?.sale_code_customer_tel}
                      </Text>
                    </View>
            
                  </View>
                </View>
                  {/*-----------  หัวตาราง ---------------------  */}
                <View style={[styles.table, { marginTop: "15" }]}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}>ลำดับ </Text>
                    <Text style={styles.tableCell2}>รายละเอียด </Text>
                    <Text style={styles.tableCell3}>จำนวน </Text>
                    <Text style={styles.tableCell4}>หน่วยนับ </Text>
                    <Text style={styles.tableCell5}>ราคา/หน่วย </Text>
                    <Text style={styles.tableCell6}>จำนวนเงิน </Text>
                  </View>
                  {/* row 1 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 1 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay?.products?.[0]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[0]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[0]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[0]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[0]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[0]?.sale_auction_start_event_count_price * dataPay.products?.[0]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 2 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 2 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[1]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[1]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[1]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[1]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[1]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[1]?.sale_auction_start_event_count_price * dataPay.products?.[1]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 3 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 3 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[2]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[2]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[2]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[2]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[2]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[2]?.sale_auction_start_event_count_price * dataPay.products?.[2]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 4 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 4 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[3]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[3]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[3]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[3]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[3]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[3]?.sale_auction_start_event_count_price * dataPay.products?.[3]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 5 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 5 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[4]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[4]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[4]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[4]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[4]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[4]?.sale_auction_start_event_count_price * dataPay.products?.[4]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 6 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 6 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[5]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[5]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[5]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[5]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[5]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[5]?.sale_auction_start_event_count_price * dataPay.products?.[5]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 7 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 7 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[6]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[6]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[6]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[6]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[6]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[6]?.sale_auction_start_event_count_price * dataPay.products?.[6]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 8 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 8 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[7]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[7]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[7]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[7]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[7]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[7]?.sale_auction_start_event_count_price * dataPay.products?.[7]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 9 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 9 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[8]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[8]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[8]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[8]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[8]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[8]?.sale_auction_start_event_count_price * dataPay.products?.[8]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 10 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 10 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[9]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[9]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[9]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[9]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[9]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[9]?.sale_auction_start_event_count_price * dataPay.products?.[9]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 11 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 11 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[10]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[10]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[10]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[10]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[10]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[10]?.sale_auction_start_event_count_price * dataPay.products?.[10]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* row 12 */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell1}> 12 </Text>
                    <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                      {" "}
                      {dataPay.products?.[11]?.product_name }{" "}
                    </Text>
                    <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[11]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                    <Text style={styles.tableCell4}> {" "} {dataPay.products?.[11]?.product_count }{" "} </Text>
                    <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[11]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                    <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[11]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[11]?.sale_auction_start_event_count_price * dataPay.products?.[11]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                  </View>
                  {/* สรุปรวม */}
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCellsum}> {" "}{` ( ${THBText(totalPrice)} )` || ''}{" "}   </Text>
                    <Text style={styles.tableCell3}> {""} </Text>
                    <Text style={styles.tableCell4}>{""}  </Text>
                    <Text style={styles.tableCell5}> รวมเป็นเงิน  </Text>
                    <Text style={styles.tableCell6}>  {Number(totalPrice).toLocaleString() || ''} </Text>
                  </View>
                </View>
                <View style={styles.flexrow}>
         <View style={[
           styles.flexrowstart,
           {width:"70%"}
           ]}>
           <Text
             style={[
               { fontWeight: "extrabold" },
               { fontFamily: "SarabunBold" },
               { fontSize: "11" },
               styles.mtsm,
               styles.spacesm,
             ]}
           >
             วันที่รับ:{" "}
           </Text>
           <Text
             style={[
               styles.mtsm,
               { fontWeight: "light" },
               { fontFamily: "Sarabun" },
               { fontSize: "11" },
               { display:"flex"},
               { width:"80%"},
             ]}
           >
             ..................................................
           </Text>
         </View>

         <View style={[
           styles.flexrow,
           {width:"30%"}
           ]}>
         <View style={styles.flexrowstart}>
             <Text
               style={[
                 { fontWeight: "extrabold" },
                 { fontFamily: "SarabunBold" },
                 { fontSize: "11" },
                 styles.mtsm,
                 styles.spacesm,
               ]}
             >
               ผู้รับชำระเงิน:{" "}

             </Text>
             <Text
               style={[
                 { fontWeight: "light" },
                 { fontFamily: "Sarabun" },
                 { fontSize: "11" },
                 styles.mtsm,
                 styles.spacesm,
               ]}
             >
             
             {" "}{dataPay?.sale_receipt_name}{" "}
             </Text>
           </View>
         </View>
               </View>
               <View style={styles.flexrow}>
                 <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
   
     
                 </View>

                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                 <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       ผู้ออกบิล:{" "}

                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                     
                     {" "}{dataPay?.sale_receipt_name_export}{" "}
                     </Text>
                   </View>
                 </View>
               </View>
               {dataPay?.sale_receipt_status == "1" ?
               ''
               :
               <View style={styles.flexrow}>
                 <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     {" "}{dataPay?.sale_receipt_status == "2" ? "โอนเข้าธนาคาร:" : dataPay?.sale_receipt_status == "3" ? "ธนาคาร:" : '' }{" "}
                   </Text>
                   <Text
                     style={[
                       styles.mtsm,
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       { display:"flex"},
                       { width:"80%"},
                     ]}
                   >
                     {" "}{dataPay?.sale_receipt_status == "2" ? dataPay?.sale_receipt_acc : dataPay?.sale_receipt_status == "3" ? dataPay?.sale_receipt_bank : '' }{" "}
                   </Text>
                 </View>

                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                 <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       {" "}{dataPay?.sale_receipt_status == "3" ? "เลขที่เช็ค" :''}{" "} 
                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                     {" "}{dataPay?.sale_receipt_check}{" "}
                     </Text>
                   </View>
                 </View>
               </View>
               }
               <View style={styles.flexrow}>
                 <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     สถานที่จัดส่ง:{" "}
                   </Text>
                   <Text
                     style={[
                       styles.mtsm,
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       { display:"flex"},
                       { width:"80%"},
                     ]}
                   >
                     {" "}{dataPay?.sale_code_customer_delivery}{" "}
                   </Text>
                 </View>

                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                 <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       เลขที่อ้างอิง:{" "}

                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                     
                     {" "}{dataPay?.sale_receipt_number}{" "}
                     </Text>
                   </View>
                 </View>
               </View>
               <View style={styles.flexrow}>
                 <View style={styles.flexrowstart}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     หมายเหตุ:{" "}
                   </Text>
                   <Text
                     style={[
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       styles.mtsm,
                     ]}
                   >
                     {dataPay?.sale_auction_q}{" "}
                   </Text>
                 </View>

               </View>
       
              </View>
            </Page>
           
             {/* สำเนา1 */}

             {statusModal == "2" ?  
             <Page size="A4" style={styles.page} >
             <View style={styles.flexrowbetween}>
               <View style={styles.flexrow}>
                 <Text style={[styles.textsm, styles.spacesm]}>{""} </Text>
                 <Text
                   style={[
                     styles.textbase,
                     { fontWeight: "light" },
                     { fontFamily: "Sarabun" },
                     {color:"blue"},
                   ]}
                 >
                   สำเนา{" "}
                 </Text>
               </View>
               <View style={styles.flexrow}>
                 <Text style={[styles.textsm, styles.spacesm]}>เลขที่ </Text>
                 <Text
                   style={[
                     styles.textsm,
                     { fontWeight: "light" },
                     { fontFamily: "Sarabun" },
                   ]}
                 >
                   {dataPay?.sale_code}
                 </Text>
               </View>
             </View>
             <View style={[styles.imageContainer, styles.flexrow]}>
               <Image
                 // src="../../../public/img/รูปอาม่า01.png"
                 src={p01}
                 style={styles.image}
               />
               <Image 
               // src="../../../public/img/รูปอากง02.png" 
               src={p02}
               style={styles.image} />
             </View>
             <View>
               <Text
                 style={[
                   styles.flexrowcenter,
                   styles.textbase,
                   { fontWeight: "thin" },
                 ]}
               >
                 ใบเสร็จ{" "}
               </Text>
               <Text style={[styles.flexrowcenter, styles.textbase, styles.mtsm]}>
                 คณะกรรมการจัดงานศาลเจ้าปึงเถ่ากงม่า ขอนแก่น{" "}
               </Text>
               <View style={styles.flexrowcenter}>
               <Text
                 style={[
                   styles.flexrowcenter,
                   styles.textsm,
                   { fontWeight: "thin", marginTop:"7px" },
                 ]}
               >
                   ประจำปี{" "}
                 </Text>
                 <Text
                 style={[
                   styles.flexrowcenter,
                   styles.textsm,
                   { fontWeight: "thin" , marginTop:"7px" },
                 ]}
               >
                   {buddhistYear}
                 </Text>
               </View>
               <View style={styles.flexrow}>
                 <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     ชื่อผู้บริจาค:{" "}
                   </Text>
                   <Text
                     style={[
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       {width:""},
                       styles.mtsm,
                     ]}
                   >
                     {dataPay?.sale_code_customer_name}{" "}
                   </Text>
                 </View>
 
                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                   <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       ชำระโดย:{" "}
                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       {" "}{dataPay?.sale_receipt_status == 1 ? "เงินสด" : dataPay?.sale_receipt_status == 2 ? "เงินโอน" : dataPay?.sale_receipt_status == 3 ? "เช็ค" : "" }
                     </Text>
                   </View>
                 </View>
               </View>
               <View style={styles.flexrow}>
                 <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     ที่อยู่:{" "}
                   </Text>
                   <Text
                     style={[
                       styles.mtsm,
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       { display:"flex"},
                       { width:"80%"},
                     ]}
                   >
                     {dataPay?.sale_code_customer_address}{" "}
                   </Text>
                 </View>
 
                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                 <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       วันที่รับชำระ:{" "}
                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       {" "}
                       {formattedDate || ''}.
                     </Text>
                   </View>
                 </View>
               </View>
               <View style={styles.flexrow}>
               <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                     <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     ออกสลากในนาม:{" "}
                   </Text>
                   <Text
                     style={[
                       styles.mtsm,
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       { display:"flex"},
                       { width:"80%"},
                     ]}
                   >
                     {dataPay?.sale_code_customer_noun + '' }.{" "} 
                   </Text>
                 </View>
 
                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                   <View style={styles.flexrowstart}>
                 <Text
                   style={[
                     { fontWeight: "extrabold" },
                     { fontFamily: "SarabunBold" },
                     { fontSize: "11" },
                     styles.mtsm,
                     styles.spacesm,
                   ]}
                 >
                   บิลอ้างอิงเล่มที่:
                 </Text>
                 <Text
                   style={[
                     { fontWeight: "light" },
                     { fontFamily: "Sarabun" },
                     { fontSize: "11" },
                     styles.mtsm,
                     styles.spacesm,
                   ]}
                 >
                
                {dataPay?.sale_auction_refer} 
                 </Text>
               </View>
             <View style={styles.flexrowstart}>
                 <Text
                   style={[
                     { fontWeight: "extrabold" },
                     { fontFamily: "SarabunBold" },
                     { fontSize: "11" },
                     styles.mtsm,
                     styles.spacesm,
                   ]}
                 >
                   เล่มที่:
                 </Text>
                 <Text
                   style={[
                     { fontWeight: "light" },
                     { fontFamily: "Sarabun" },
                     { fontSize: "11" },
                     styles.mtsm,
                     styles.spacesm,
                   ]}
                 >
                   {" "}
                   {dataPay?.sale_auction_num}
                 </Text>
               </View>
                 </View>
               </View>
               <View style={styles.flexrow}>
               <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     ผู้ติดต่อ:{" "}
                   </Text>
                   <Text
                     style={[
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       {display:"flex"},
                       { width:"80%"},
                       styles.mtsm,
                     ]}
                   >
                   {dataPay?.sale_code_customer_contract}{" "}
                   </Text>
                 </View>
 
                 <View style={[
               styles.flexrow,
               {width:"30%"}
               ]}>
                 <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       เบอร์โทรศัพท์:{" "}
                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       {" "}
                       {dataPay?.sale_code_customer_tel}
                     </Text>
                   </View>
           
                 </View>
               </View>
                 {/*-----------  หัวตาราง ---------------------  */}
               <View style={[styles.table, { marginTop: "15" }]}>
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}>ลำดับ </Text>
                   <Text style={styles.tableCell2}>รายละเอียด </Text>
                   <Text style={styles.tableCell3}>จำนวน </Text>
                   <Text style={styles.tableCell4}>หน่วยนับ </Text>
                   <Text style={styles.tableCell5}>ราคา/หน่วย </Text>
                   <Text style={styles.tableCell6}>จำนวนเงิน </Text>
                 </View>
                 {/* row 1 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 1 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay?.products?.[0]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[0]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[0]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[0]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[0]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[0]?.sale_auction_start_event_count_price * dataPay.products?.[0]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 2 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 2 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[1]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[1]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[1]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[1]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[1]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[1]?.sale_auction_start_event_count_price * dataPay.products?.[1]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 3 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 3 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[2]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[2]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[2]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[2]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[2]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[2]?.sale_auction_start_event_count_price * dataPay.products?.[2]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 4 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 4 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[3]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[3]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[3]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[3]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[3]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[3]?.sale_auction_start_event_count_price * dataPay.products?.[3]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 5 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 5 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[4]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[4]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[4]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[4]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[4]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[4]?.sale_auction_start_event_count_price * dataPay.products?.[4]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 6 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 6 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[5]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[5]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[5]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[5]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[5]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[5]?.sale_auction_start_event_count_price * dataPay.products?.[5]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 7 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 7 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[6]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[6]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[6]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[6]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[6]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[6]?.sale_auction_start_event_count_price * dataPay.products?.[6]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 8 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 8 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[7]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[7]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[7]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[7]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[7]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[7]?.sale_auction_start_event_count_price * dataPay.products?.[7]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 9 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 9 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[8]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[8]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[8]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[8]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[8]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[8]?.sale_auction_start_event_count_price * dataPay.products?.[8]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 10 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 10 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[9]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[9]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[9]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[9]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[9]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[9]?.sale_auction_start_event_count_price * dataPay.products?.[9]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 11 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 11 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[10]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[10]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[10]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[10]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[10]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[10]?.sale_auction_start_event_count_price * dataPay.products?.[10]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 12 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 12 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[11]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[11]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[11]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[11]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[11]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[11]?.sale_auction_start_event_count_price * dataPay.products?.[11]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* สรุปรวม */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCellsum}> {" "}{` ( ${THBText(totalPrice)} )` || ''}{" "}   </Text>
                   <Text style={styles.tableCell3}> {""} </Text>
                   <Text style={styles.tableCell4}>{""}  </Text>
                   <Text style={styles.tableCell5}> รวมเป็นเงิน  </Text>
                   <Text style={styles.tableCell6}>  {Number(totalPrice).toLocaleString() || ''} </Text>
                 </View>
               </View>
               <View style={styles.flexrow}>
        <View style={[
          styles.flexrowstart,
          {width:"70%"}
          ]}>
          <Text
            style={[
              { fontWeight: "extrabold" },
              { fontFamily: "SarabunBold" },
              { fontSize: "11" },
              styles.mtsm,
              styles.spacesm,
            ]}
          >
            วันที่รับ:{" "}
          </Text>
          <Text
            style={[
              styles.mtsm,
              { fontWeight: "light" },
              { fontFamily: "Sarabun" },
              { fontSize: "11" },
              { display:"flex"},
              { width:"80%"},
            ]}
          >
            ..................................................
          </Text>
        </View>

        <View style={[
          styles.flexrow,
          {width:"30%"}
          ]}>
        <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "11" },
                styles.mtsm,
                styles.spacesm,
              ]}
            >
              ผู้รับชำระเงิน:{" "}

            </Text>
            <Text
              style={[
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
                { fontSize: "11" },
                styles.mtsm,
                styles.spacesm,
              ]}
            >
            
            {" "}{dataPay?.sale_receipt_name}{" "}
            </Text>
          </View>
        </View>
              </View>
              <View style={styles.flexrow}>
                <View style={[
                  styles.flexrowstart,
                  {width:"70%"}
                  ]}>
  
    
                </View>

                <View style={[
                  styles.flexrow,
                  {width:"30%"}
                  ]}>
                <View style={styles.flexrowstart}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      ผู้ออกบิล:{" "}

                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                    
                    {" "}{dataPay?.sale_receipt_name_export}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              {dataPay?.sale_receipt_status == "1" ?
              ''
              :
              <View style={styles.flexrow}>
                <View style={[
                  styles.flexrowstart,
                  {width:"70%"}
                  ]}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    {" "}{dataPay?.sale_receipt_status == "2" ? "โอนเข้าธนาคาร:" : dataPay?.sale_receipt_status == "3" ? "ธนาคาร:" : '' }{" "}
                  </Text>
                  <Text
                    style={[
                      styles.mtsm,
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      { display:"flex"},
                      { width:"80%"},
                    ]}
                  >
                    {" "}{dataPay?.sale_receipt_status == "2" ? dataPay?.sale_receipt_acc : dataPay?.sale_receipt_status == "3" ? dataPay?.sale_receipt_bank : '' }{" "}
                  </Text>
                </View>

                <View style={[
                  styles.flexrow,
                  {width:"30%"}
                  ]}>
                <View style={styles.flexrowstart}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      {" "}{dataPay?.sale_receipt_status == "3" ? "เลขที่เช็ค" :''}{" "} 
                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                    {" "}{dataPay?.sale_receipt_check}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              }
              <View style={styles.flexrow}>
                <View style={[
                  styles.flexrowstart,
                  {width:"70%"}
                  ]}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    สถานที่จัดส่ง:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.mtsm,
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      { display:"flex"},
                      { width:"80%"},
                    ]}
                  >
                    {" "}{dataPay?.sale_code_customer_delivery}{" "}
                  </Text>
                </View>

                <View style={[
                  styles.flexrow,
                  {width:"30%"}
                  ]}>
                <View style={styles.flexrowstart}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      เลขที่อ้างอิง:{" "}

                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                    
                    {" "}{dataPay?.sale_receipt_number}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrow}>
                <View style={styles.flexrowstart}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    หมายเหตุ:{" "}
                  </Text>
                  <Text
                    style={[
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      styles.mtsm,
                    ]}
                  >
                    {dataPay?.sale_auction_q}{" "}
                  </Text>
                </View>

              </View>
      
             </View>
           </Page>
             :
             ''
             }
         
         
             {/* สำเนา2 */}
             {statusModal == "2" ?  
             <Page size="A4" style={styles.page} >
             <View style={styles.flexrowbetween}>
               <View style={styles.flexrow}>
                 <Text style={[styles.textsm, styles.spacesm]}>{""} </Text>
                 <Text
                   style={[
                     styles.textbase,
                     { fontWeight: "light" },
                     { fontFamily: "Sarabun" },
                     {color:"blue"},
                   ]}
                 >
                   สำเนา{" "}
                 </Text>
               </View>
               <View style={styles.flexrow}>
                 <Text style={[styles.textsm, styles.spacesm]}>เลขที่ </Text>
                 <Text
                   style={[
                     styles.textsm,
                     { fontWeight: "light" },
                     { fontFamily: "Sarabun" },
                   ]}
                 >
                   {dataPay?.sale_code}
                 </Text>
               </View>
             </View>
             <View style={[styles.imageContainer, styles.flexrow]}>
               <Image
                 // src="../../../public/img/รูปอาม่า01.png"
                 src={p01}
                 style={styles.image}
               />
               <Image 
               // src="../../../public/img/รูปอากง02.png" 
               src={p02}
               style={styles.image} />
             </View>
             <View>
               <Text
                 style={[
                   styles.flexrowcenter,
                   styles.textbase,
                   { fontWeight: "thin" },
                 ]}
               >
                 ใบเสร็จ{" "}
               </Text>
               <Text style={[styles.flexrowcenter, styles.textbase, styles.mtsm]}>
                 คณะกรรมการจัดงานศาลเจ้าปึงเถ่ากงม่า ขอนแก่น{" "}
               </Text>
               <View style={styles.flexrowcenter}>
               <Text
                 style={[
                   styles.flexrowcenter,
                   styles.textsm,
                   { fontWeight: "thin", marginTop:"7px" },
                 ]}
               >
                   ประจำปี{" "}
                 </Text>
                 <Text
                 style={[
                   styles.flexrowcenter,
                   styles.textsm,
                   { fontWeight: "thin" , marginTop:"7px" },
                 ]}
               >
                   {buddhistYear}
                 </Text>
               </View>
               <View style={styles.flexrow}>
                 <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     ชื่อผู้บริจาค:{" "}
                   </Text>
                   <Text
                     style={[
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       {width:""},
                       styles.mtsm,
                     ]}
                   >
                     {dataPay?.sale_code_customer_name}{" "}
                   </Text>
                 </View>
 
                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                   <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       ชำระโดย:{" "}
                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       {" "}{dataPay?.sale_receipt_status == 1 ? "เงินสด" : dataPay?.sale_receipt_status == 2 ? "เงินโอน" : dataPay?.sale_receipt_status == 3 ? "เช็ค" : "" }
                     </Text>
                   </View>
                 </View>
               </View>
               <View style={styles.flexrow}>
                 <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     ที่อยู่:{" "}
                   </Text>
                   <Text
                     style={[
                       styles.mtsm,
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       { display:"flex"},
                       { width:"80%"},
                     ]}
                   >
                     {dataPay?.sale_code_customer_address}{" "}
                   </Text>
                 </View>
 
                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                 <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       วันที่รับชำระ:{" "}
                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       {" "}
                       {formattedDate || ''}.
                     </Text>
                   </View>
                 </View>
               </View>
               <View style={styles.flexrow}>
               <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                     <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     ออกสลากในนาม:{" "}
                   </Text>
                   <Text
                     style={[
                       styles.mtsm,
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       { display:"flex"},
                       { width:"80%"},
                     ]}
                   >
                     {dataPay?.sale_code_customer_noun + '' }.{" "} 
                   </Text>
                 </View>
 
                 <View style={[
                   styles.flexrow,
                   {width:"30%"}
                   ]}>
                   <View style={styles.flexrowstart}>
                 <Text
                   style={[
                     { fontWeight: "extrabold" },
                     { fontFamily: "SarabunBold" },
                     { fontSize: "11" },
                     styles.mtsm,
                     styles.spacesm,
                   ]}
                 >
                   บิลอ้างอิงเล่มที่:
                 </Text>
                 <Text
                   style={[
                     { fontWeight: "light" },
                     { fontFamily: "Sarabun" },
                     { fontSize: "11" },
                     styles.mtsm,
                     styles.spacesm,
                   ]}
                 >
                
                {dataPay?.sale_auction_refer} 
                 </Text>
               </View>
             <View style={styles.flexrowstart}>
                 <Text
                   style={[
                     { fontWeight: "extrabold" },
                     { fontFamily: "SarabunBold" },
                     { fontSize: "11" },
                     styles.mtsm,
                     styles.spacesm,
                   ]}
                 >
                   เล่มที่:
                 </Text>
                 <Text
                   style={[
                     { fontWeight: "light" },
                     { fontFamily: "Sarabun" },
                     { fontSize: "11" },
                     styles.mtsm,
                     styles.spacesm,
                   ]}
                 >
                   {" "}
                   {dataPay?.sale_auction_num}
                 </Text>
               </View>
                 </View>
               </View>
               <View style={styles.flexrow}>
               <View style={[
                   styles.flexrowstart,
                   {width:"70%"}
                   ]}>
                   <Text
                     style={[
                       { fontWeight: "extrabold" },
                       { fontFamily: "SarabunBold" },
                       { fontSize: "11" },
                       styles.mtsm,
                       styles.spacesm,
                     ]}
                   >
                     ผู้ติดต่อ:{" "}
                   </Text>
                   <Text
                     style={[
                       { fontWeight: "light" },
                       { fontFamily: "Sarabun" },
                       { fontSize: "11" },
                       {display:"flex"},
                       { width:"80%"},
                       styles.mtsm,
                     ]}
                   >
                   {dataPay?.sale_code_customer_contract}{" "}
                   </Text>
                 </View>
 
                 <View style={[
               styles.flexrow,
               {width:"30%"}
               ]}>
                 <View style={styles.flexrowstart}>
                     <Text
                       style={[
                         { fontWeight: "extrabold" },
                         { fontFamily: "SarabunBold" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       เบอร์โทรศัพท์:{" "}
                     </Text>
                     <Text
                       style={[
                         { fontWeight: "light" },
                         { fontFamily: "Sarabun" },
                         { fontSize: "11" },
                         styles.mtsm,
                         styles.spacesm,
                       ]}
                     >
                       {" "}
                       {dataPay?.sale_code_customer_tel}
                     </Text>
                   </View>
           
                 </View>
               </View>
                 {/*-----------  หัวตาราง ---------------------  */}
               <View style={[styles.table, { marginTop: "15" }]}>
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}>ลำดับ </Text>
                   <Text style={styles.tableCell2}>รายละเอียด </Text>
                   <Text style={styles.tableCell3}>จำนวน </Text>
                   <Text style={styles.tableCell4}>หน่วยนับ </Text>
                   <Text style={styles.tableCell5}>ราคา/หน่วย </Text>
                   <Text style={styles.tableCell6}>จำนวนเงิน </Text>
                 </View>
                 {/* row 1 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 1 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay?.products?.[0]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[0]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[0]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[0]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[0]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[0]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[0]?.sale_auction_start_event_count_price * dataPay.products?.[0]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 2 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 2 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[1]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[1]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[1]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[1]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[1]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[1]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[1]?.sale_auction_start_event_count_price * dataPay.products?.[1]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 3 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 3 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[2]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[2]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[2]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[2]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[2]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[2]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[2]?.sale_auction_start_event_count_price * dataPay.products?.[2]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 4 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 4 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[3]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[3]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[3]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[3]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[3]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[3]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[3]?.sale_auction_start_event_count_price * dataPay.products?.[3]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 5 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 5 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[4]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[4]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[4]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[4]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[4]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[4]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[4]?.sale_auction_start_event_count_price * dataPay.products?.[4]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 6 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 6 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[5]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[5]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[5]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[5]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[5]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[5]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[5]?.sale_auction_start_event_count_price * dataPay.products?.[5]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 7 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 7 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[6]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[6]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[6]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[6]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[6]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[6]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[6]?.sale_auction_start_event_count_price * dataPay.products?.[6]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 8 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 8 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[7]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[7]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[7]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[7]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[7]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[7]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[7]?.sale_auction_start_event_count_price * dataPay.products?.[7]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 9 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 9 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[8]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[8]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[8]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[8]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[8]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[8]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[8]?.sale_auction_start_event_count_price * dataPay.products?.[8]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 10 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 10 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[9]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[9]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[9]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[9]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[9]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[9]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[9]?.sale_auction_start_event_count_price * dataPay.products?.[9]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 11 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 11 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[10]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[10]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[10]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[10]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[10]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[10]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[10]?.sale_auction_start_event_count_price * dataPay.products?.[10]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* row 12 */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCell1}> 12 </Text>
                   <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                     {" "}
                     {dataPay.products?.[11]?.product_name }{" "}
                   </Text>
                   <Text style={styles.tableCell3}>{" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count) ? '' : Number(dataPay.products?.[11]?.sale_auction_start_event_count).toLocaleString() } {" "} </Text>
                   <Text style={styles.tableCell4}> {" "} {dataPay.products?.[11]?.product_count }{" "} </Text>
                   <Text style={styles.tableCell5}> {" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count_price) ? '' : Number(dataPay.products?.[11]?.sale_auction_start_event_count_price).toLocaleString() }{" "} </Text>
                   <Text style={styles.tableCell6}> {" "} {isNaN(dataPay.products?.[11]?.sale_auction_start_event_count_price) || isNaN(dataPay.products?.[11]?.sale_auction_start_event_count) ? '' : (dataPay.products?.[11]?.sale_auction_start_event_count_price * dataPay.products?.[11]?.sale_auction_start_event_count).toLocaleString()}{" "}</Text>
                 </View>
                 {/* สรุปรวม */}
                 <View style={styles.tableRow}>
                   <Text style={styles.tableCellsum}> {" "}{` ( ${THBText(totalPrice)} )` || ''}{" "}   </Text>
                   <Text style={styles.tableCell3}> {""} </Text>
                   <Text style={styles.tableCell4}>{""}  </Text>
                   <Text style={styles.tableCell5}> รวมเป็นเงิน  </Text>
                   <Text style={styles.tableCell6}>  {Number(totalPrice).toLocaleString() || ''} </Text>
                 </View>
               </View>
               <View style={styles.flexrow}>
        <View style={[
          styles.flexrowstart,
          {width:"70%"}
          ]}>
          <Text
            style={[
              { fontWeight: "extrabold" },
              { fontFamily: "SarabunBold" },
              { fontSize: "11" },
              styles.mtsm,
              styles.spacesm,
            ]}
          >
            วันที่รับ:{" "}
          </Text>
          <Text
            style={[
              styles.mtsm,
              { fontWeight: "light" },
              { fontFamily: "Sarabun" },
              { fontSize: "11" },
              { display:"flex"},
              { width:"80%"},
            ]}
          >
            ..................................................
          </Text>
        </View>

        <View style={[
          styles.flexrow,
          {width:"30%"}
          ]}>
        <View style={styles.flexrowstart}>
            <Text
              style={[
                { fontWeight: "extrabold" },
                { fontFamily: "SarabunBold" },
                { fontSize: "11" },
                styles.mtsm,
                styles.spacesm,
              ]}
            >
              ผู้รับชำระเงิน:{" "}

            </Text>
            <Text
              style={[
                { fontWeight: "light" },
                { fontFamily: "Sarabun" },
                { fontSize: "11" },
                styles.mtsm,
                styles.spacesm,
              ]}
            >
            
            {" "}{dataPay?.sale_receipt_name}{" "}
            </Text>
          </View>
        </View>
              </View>
              <View style={styles.flexrow}>
                <View style={[
                  styles.flexrowstart,
                  {width:"70%"}
                  ]}>
  
    
                </View>

                <View style={[
                  styles.flexrow,
                  {width:"30%"}
                  ]}>
                <View style={styles.flexrowstart}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      ผู้ออกบิล:{" "}

                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                    
                    {" "}{dataPay?.sale_receipt_name_export}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              {dataPay?.sale_receipt_status == "1" ?
              ''
              :
              <View style={styles.flexrow}>
                <View style={[
                  styles.flexrowstart,
                  {width:"70%"}
                  ]}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    {" "}{dataPay?.sale_receipt_status == "2" ? "โอนเข้าธนาคาร:" : dataPay?.sale_receipt_status == "3" ? "ธนาคาร:" : '' }{" "}
                  </Text>
                  <Text
                    style={[
                      styles.mtsm,
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      { display:"flex"},
                      { width:"80%"},
                    ]}
                  >
                    {" "}{dataPay?.sale_receipt_status == "2" ? dataPay?.sale_receipt_acc : dataPay?.sale_receipt_status == "3" ? dataPay?.sale_receipt_bank : '' }{" "}
                  </Text>
                </View>

                <View style={[
                  styles.flexrow,
                  {width:"30%"}
                  ]}>
                <View style={styles.flexrowstart}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      {" "}{dataPay?.sale_receipt_status == "3" ? "เลขที่เช็ค" :''}{" "} 
                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                    {" "}{dataPay?.sale_receipt_check}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              }
              <View style={styles.flexrow}>
                <View style={[
                  styles.flexrowstart,
                  {width:"70%"}
                  ]}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    สถานที่จัดส่ง:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.mtsm,
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      { display:"flex"},
                      { width:"80%"},
                    ]}
                  >
                    {" "}{dataPay?.sale_code_customer_delivery}{" "}
                  </Text>
                </View>

                <View style={[
                  styles.flexrow,
                  {width:"30%"}
                  ]}>
                <View style={styles.flexrowstart}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                      เลขที่อ้างอิง:{" "}

                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        styles.mtsm,
                        styles.spacesm,
                      ]}
                    >
                    
                    {" "}{dataPay?.sale_receipt_number}{" "}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrow}>
                <View style={styles.flexrowstart}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtsm,
                      styles.spacesm,
                    ]}
                  >
                    หมายเหตุ:{" "}
                  </Text>
                  <Text
                    style={[
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      styles.mtsm,
                    ]}
                  >
                    {dataPay?.sale_auction_q}{" "}
                  </Text>
                </View>

              </View>
      
             </View>
           </Page>
             :
             ''
             }
         
               
         </Document>
         </PDFViewer>
           </DialogBody>

       
        {/* <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen3}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen3}>
            <span>Confirm</span>
          </Button>
        </DialogFooter> */}
      </Dialog>
    </div>
  );
};

export default BillPay_Sale;
