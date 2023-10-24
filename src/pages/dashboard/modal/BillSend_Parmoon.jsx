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
  column: {
    flex: 1,  
    flexDirection: 'column',
    marginLeft: 10,  // ระยะห่างระหว่างคอลัม
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
  spacexs: {
    marginRight: 3,
  },
  spacesm: {
    marginRight: 4,
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

  },
  mtsm20: {
    marginTop: 20,

  },
  mtmd: {
    marginTop: 30,
  },
  mtlg: {
    marginTop: 50,
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
    width: "10%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell2: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "40%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
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
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell5: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "15%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCell6: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "25%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
  tableCellsum: {
    margin: "auto",
    fontSize: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    width: "50%", // แบ่งเป็น 3 ส่วนเท่า ๆ กัน (ขนาดเท่ากัน)
    height: "100%",
  },
});

const BillSend_Parmoon = ({ open3, handleOpen3, data, statusModal }) => {
  
  
  const [dataPay, setDataPay] = useState([]);

  
  useEffect(() => {
    // console.log(data[0]);
    setDataPay(data[0])

  }, [open3]);

  // console.log(dataPay)

  const currentDate = new Date();

  const buddhistYear = currentDate.getFullYear() + 543;
  // console.log(buddhistYear);
  //  --------------- แปลงรูปแบบวันที่ วว/ดด/ปป -------------------------------- //
  const dateObject = new Date(dataPay?.auction_report_date);

  // รับค่าวันที่, เดือน, และปี
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // เดือนจะนับเริ่มต้นที่ 0, เพิ่ม 1 เพื่อเป็นเดือนที่ถูกต้อง
  const year = dateObject.getFullYear() + 543; // เพิ่ม 543 เพื่อแปลงเป็น พ.ศ.

  // สร้างรูปแบบวันที่ใหม่ "dd/mm/yyyy"
  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
  
  return (
    <div>
      <Dialog open={open3} size="xl" handler={handleOpen3}>
        <DialogHeader> 
            บิลที่ {data[0]?.number} 
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
                  {color:"red"}
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
                {dataPay?.number}
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
              ใบรับของ{" "}
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
                {width:"65%"}
                ]}>
                <Text
                  style={[
                    { fontWeight: "extrabold" },
                    { fontFamily: "SarabunBold" },
                    { fontSize: "11" },
                    styles.mtmd,
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
                    styles.mtmd,
                  ]}
                >
                  {dataPay?.auction_report_user_auction}{" "}
                </Text>
              </View>

              <View style={[
                styles.flexrow,
                {width:"35%"}
                ]}>
                <View style={styles.flexrowstart}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtmd,
                      styles.spacesm,
                    ]}
                  >
                    วันที่:{" "}
                  </Text>
                  <Text
                    style={[
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      styles.mtmd,
                      styles.spacesm,
                    ]}
                  >
                    {" "}
                    {formattedDate}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.flexrow}>
              <View style={[
                styles.flexrowstart,
                {width:"65%"}
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
                  {dataPay?.auction_report_customer_address}{" "}
                </Text>
              </View>

              <View style={[
                styles.flexrow,
                {width:"35%"}
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
                    {" "}เบอร์โทรศัพท์:{" "}
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
                    {dataPay?.auction_report_customer_tel}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.flexrow}>
            <View style={[
                styles.flexrowstart,
                {width:"65%"}
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
                    { width:"76%"},
                  ]}
                >
                  {" "}{dataPay?.auction_report_customer_noun + '' }. {" "}
                </Text>
              </View>

              <View style={[
                styles.flexrow,
                {width:"35%"}
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
                   
                    {dataPay?.auction_refer}
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
                    {dataPay?.auction_num}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.flexrow}>
            <View style={[
                styles.flexrowstart,
                {width:"65%"}
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
                {dataPay?.auction_report_customer_contract}{" "}
                </Text>
              </View>

  
            </View>
              {/*-----------  หัวตาราง ---------------------  */}
            <View style={[styles.table, { marginTop: "15" }]}>
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}>ลำดับ </Text>
                <Text style={styles.tableCell2}>รายละเอียด </Text>
                <Text style={styles.tableCell3}>จำนวน </Text>
                <Text style={styles.tableCell4}>หน่วยนับ </Text>
                <Text style={styles.tableCell6}>จำนวนเงิน </Text>
              </View>
              {/* row 1 */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}> 1 </Text>
                <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                  {" "}
                  {dataPay?.auction_report_auctionstarted }{" "}
                </Text>
                <Text style={styles.tableCell3}>{" "} 1 {" "} </Text>
                <Text style={styles.tableCell4}> {" "}{""} {" "} </Text>
                <Text style={styles.tableCell6}> {" "} {Number(dataPay?.auction_report_price).toLocaleString()}{" "}</Text>
              </View>
              {/* row 2 */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}> 2 </Text>
                <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                  {" "}
                  {dataPay?.aomsin1?.[0]?.auction_auction_start_event }{" "}
                </Text>
                <Text style={styles.tableCell3}>{" "} {dataPay?.aomsin1?.[0]?.auction_auction_start_event_count }{" "} </Text>
                <Text style={styles.tableCell4}> {" "}{""} {" "} </Text>
                <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
              </View>
              {/* row 3 */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}> 3 </Text>
                <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                  {" "}
                  {dataPay?.aomsin1?.[1]?.auction_auction_start_event }{" "}
                </Text>
                <Text style={styles.tableCell3}>{" "} {dataPay?.aomsin1?.[1]?.auction_auction_start_event_count }{" "} </Text>
                <Text style={styles.tableCell4}> {" "}{""} {" "} </Text>
                <Text style={styles.tableCell6}> {" "} {""}{" "}</Text>
              </View>
              {/* row 4 */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}> 4 </Text>
                <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                  {" "}
                  {dataPay?.product1?.[0]?.auction_product_start_event }{" "}
                </Text>
                <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[0]?.auction_product_start_event_count }{" "} </Text>
                <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[0]?.auction_product_start_event_cat_count }{" "} </Text>
                <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
              </View>
              {/* row 5 */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}> 5 </Text>
                <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                  {" "}
                  {dataPay?.product1?.[1]?.auction_product_start_event }{" "}
                </Text>
                <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[1]?.auction_product_start_event_count }{" "} </Text>
                <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[1]?.auction_product_start_event_cat_count }{" "} </Text>
                <Text style={styles.tableCell6}> {" "} {""}{" "}</Text>
              </View>
              {/* row 6 */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}> 6 </Text>
                <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                  {" "}
                  {dataPay?.product1?.[2]?.auction_product_start_event }{" "}
                </Text>
                <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[2]?.auction_product_start_event_count }{" "} </Text>
                <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[2]?.auction_product_start_event_cat_count }{" "} </Text>
                <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
              </View>
              {/* row 7 */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}> 7 </Text>
                <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                  {" "}
                  {dataPay?.product1?.[3]?.auction_product_start_event }{" "}
                </Text>
                <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[3]?.auction_product_start_event_count }{" "} </Text>
                <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[3]?.auction_product_start_event_cat_count }{" "} </Text>
                <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
              </View>
              {/* row 8 */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCell1}> 8 </Text>
                <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                  {" "}
                  {dataPay?.product1?.[4]?.auction_product_start_event }{" "}
                </Text>
                <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[4]?.auction_product_start_event_count }{" "} </Text>
                <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[4]?.auction_product_start_event_cat_count }{" "} </Text>
                <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
              </View>
              {/* สรุปรวม */}
              <View style={styles.tableRow}>
                <Text style={styles.tableCellsum}> {" "}{`( ${THBText(dataPay?.auction_report_price)} )`}{" "}  </Text>
                <Text style={styles.tableCell3}>{""}  </Text>
                <Text style={styles.tableCell4}> รวมเป็นเงิน  </Text>
                <Text style={styles.tableCell6}> {" "}{Number(dataPay?.auction_report_price).toLocaleString()}{" "}</Text>
              </View>
            </View>
            <View style={styles.flexrow}>
            <View style={[
                styles.flexrowstart,
                {width:"67%"}
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
                  ผู้รับของ:{" "}
                </Text>
                <Text
                  style={[
                    styles.mtsm,
                    { fontWeight: "light" },
                    { fontFamily: "Sarabun" },
                    { fontSize: "11" },
                    { display:"flex"},
                    { width:"76%"},
                  ]}
                >
                  ...................................................
                </Text>
              </View>

              <View style={[
                styles.flexrow,
                {width:"33%"}
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
                    ผู้ส่งของ:{" "}
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
                    ........................................
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.flexrow}>
            <View style={[
                styles.flexrowstart,
                {width:"67%"}
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
                    { width:"76%"},
                  ]}
                >
                  {dataPay?.auction_report_customer_delivery}.{" "}
                </Text>
              </View>

              <View style={[
                styles.flexrow,
                {width:"33%"}
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
                    วันที่รับ:{" "}
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
                    ..........................................
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.flexrowbetween}>
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
                    {display:"flex"},
                    {width:"90%"},
                    styles.mtsm,
                  ]}
                >
                  {dataPay?.auction_report_q}{" "}
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
                    {color:"blue"}
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
                  {dataPay?.number}
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
                ใบรับของ{" "}
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
                  {width:"65%"}
                  ]}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtmd,
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
                      styles.mtmd,
                    ]}
                  >
                    {dataPay?.auction_report_user_auction}{" "}
                  </Text>
                </View>
  
                <View style={[
                  styles.flexrow,
                  {width:"35%"}
                  ]}>
                  <View style={styles.flexrowstart}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtmd,
                        styles.spacesm,
                      ]}
                    >
                      วันที่:{" "}
                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        styles.mtmd,
                        styles.spacesm,
                      ]}
                    >
                      {" "}
                      {formattedDate}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrow}>
                <View style={[
                  styles.flexrowstart,
                  {width:"65%"}
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
                    {dataPay?.auction_report_customer_address}{" "}
                  </Text>
                </View>
  
                <View style={[
                  styles.flexrow,
                  {width:"35%"}
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
                      {" "}เบอร์โทรศัพท์:{" "}
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
                      {dataPay?.auction_report_customer_tel}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrow}>
              <View style={[
                  styles.flexrowstart,
                  {width:"65%"}
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
                      { width:"76%"},
                    ]}
                  >
                    {" "}{dataPay?.auction_report_customer_noun + '' }. {" "}
                  </Text>
                </View>
  
                <View style={[
                styles.flexrow,
                {width:"35%"}
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
                  
                    {dataPay?.auction_refer}
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
                    {dataPay?.auction_num}
                  </Text>
                </View>
              </View>
              </View>
              <View style={styles.flexrow}>
              <View style={[
                  styles.flexrowstart,
                  {width:"65%"}
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
                  {dataPay?.auction_report_customer_contract}{" "}
                  </Text>
                </View>
  
    
              </View>
                {/*-----------  หัวตาราง ---------------------  */}
              <View style={[styles.table, { marginTop: "15" }]}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}>ลำดับ </Text>
                  <Text style={styles.tableCell2}>รายละเอียด </Text>
                  <Text style={styles.tableCell3}>จำนวน </Text>
                  <Text style={styles.tableCell4}>หน่วยนับ </Text>
                  <Text style={styles.tableCell6}>จำนวนเงิน </Text>
                </View>
                {/* row 1 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 1 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.auction_report_auctionstarted }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} 1 {" "} </Text>
                  <Text style={styles.tableCell4}> {" "}{""} {" "} </Text>
                  <Text style={styles.tableCell6}> {" "} {Number(dataPay?.auction_report_price).toLocaleString()}{" "}</Text>
                </View>
                {/* row 2 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 2 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.aomsin1?.[0]?.auction_auction_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.aomsin1?.[0]?.auction_auction_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {""}{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 3 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 3 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.aomsin1?.[1]?.auction_auction_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.aomsin1?.[1]?.auction_auction_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "}{""} {" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 4 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 4 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[0]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[0]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[0]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "} {""}{" "}</Text>
                </View>
                {/* row 5 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 5 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[1]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[1]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[1]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 6 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 6 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[2]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[2]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[2]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 7 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 7 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[3]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[3]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[3]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 8 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 8 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[4]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[4]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[4]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* สรุปรวม */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellsum}> {" "}{`( ${THBText(dataPay?.auction_report_price)} )`}{" "}  </Text>
                  <Text style={styles.tableCell3}> {""} </Text>
                  <Text style={styles.tableCell4}> รวมเป็นเงิน  </Text>
                  <Text style={styles.tableCell6}> {" "}{Number(dataPay?.auction_report_price).toLocaleString()}{" "}</Text>
                </View>
              </View>
              <View style={styles.flexrow}>
              <View style={[
                  styles.flexrowstart,
                  {width:"67%"}
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
                    ผู้รับของ:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.mtsm,
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      { display:"flex"},
                      { width:"76%"},
                    ]}
                  >
                    ...................................................
                  </Text>
                </View>
  
                <View style={[
                  styles.flexrow,
                  {width:"33%"}
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
                      ผู้ส่งของ:{" "}
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
                      ........................................
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrow}>
              <View style={[
                  styles.flexrowstart,
                  {width:"67%"}
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
                      { width:"76%"},
                    ]}
                  >
                    {dataPay?.auction_report_customer_delivery}.{" "}
                  </Text>
                </View>
  
                <View style={[
                  styles.flexrow,
                  {width:"33%"}
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
                      วันที่รับ:{" "}
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
                      ..........................................
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrowbetween}>
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
                      {display:"flex"},
                      {width:"90%"},
                      styles.mtsm,
                    ]}
                  >
                    {dataPay?.auction_report_q}{" "}
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
                    {color:"blue"}
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
                  {dataPay?.number}
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
                ใบรับของ{" "}
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
                  {width:"65%"}
                  ]}>
                  <Text
                    style={[
                      { fontWeight: "extrabold" },
                      { fontFamily: "SarabunBold" },
                      { fontSize: "11" },
                      styles.mtmd,
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
                      styles.mtmd,
                    ]}
                  >
                    {dataPay?.auction_report_user_auction}{" "}
                  </Text>
                </View>
  
                <View style={[
                  styles.flexrow,
                  {width:"35%"}
                  ]}>
                  <View style={styles.flexrowstart}>
                    <Text
                      style={[
                        { fontWeight: "extrabold" },
                        { fontFamily: "SarabunBold" },
                        { fontSize: "11" },
                        styles.mtmd,
                        styles.spacesm,
                      ]}
                    >
                      วันที่:{" "}
                    </Text>
                    <Text
                      style={[
                        { fontWeight: "light" },
                        { fontFamily: "Sarabun" },
                        { fontSize: "11" },
                        styles.mtmd,
                        styles.spacesm,
                      ]}
                    >
                      {" "}
                      {formattedDate}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrow}>
                <View style={[
                  styles.flexrowstart,
                  {width:"65%"}
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
                    {dataPay?.auction_report_customer_address}{" "}
                  </Text>
                </View>
  
                <View style={[
                  styles.flexrow,
                  {width:"35%"}
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
                      {" "}เบอร์โทรศัพท์:{" "}
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
                      {dataPay?.auction_report_customer_tel}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrow}>
              <View style={[
                  styles.flexrowstart,
                  {width:"65%"}
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
                      { width:"76%"},
                    ]}
                  >
                    {" "}{dataPay?.auction_report_customer_noun + '' }. {" "}
                  </Text>
                </View>
  
                <View style={[
                styles.flexrow,
                {width:"35%"}
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
                 
                    {dataPay?.auction_refer}
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
                    {dataPay?.auction_num}
                  </Text>
                </View>
              </View>
              </View>
              <View style={styles.flexrow}>
              <View style={[
                  styles.flexrowstart,
                  {width:"65%"}
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
                  {dataPay?.auction_report_customer_contract}{" "}
                  </Text>
                </View>
  
    
              </View>
                {/*-----------  หัวตาราง ---------------------  */}
              <View style={[styles.table, { marginTop: "15" }]}>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}>ลำดับ </Text>
                  <Text style={styles.tableCell2}>รายละเอียด </Text>
                  <Text style={styles.tableCell3}>จำนวน </Text>
                  <Text style={styles.tableCell4}>หน่วยนับ </Text>
                  <Text style={styles.tableCell6}>จำนวนเงิน </Text>
                </View>
                {/* row 1 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 1 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.auction_report_auctionstarted }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} 1 {" "} </Text>
                  <Text style={styles.tableCell4}> {" "}{""} {" "} </Text>
                  <Text style={styles.tableCell6}> {" "} {Number(dataPay?.auction_report_price).toLocaleString()}{" "}</Text>
                </View>
                {/* row 2 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 2 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.aomsin1?.[0]?.auction_auction_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.aomsin1?.[0]?.auction_auction_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "}{""} {" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 3 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 3 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.aomsin1?.[1]?.auction_auction_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.aomsin1?.[1]?.auction_auction_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "}{""} {" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 4 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 4 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[0]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[0]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[0]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 5 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 5 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[1]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[1]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[1]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 6 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 6 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[2]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[2]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[2]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* row 7 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 7 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[3]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[3]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[3]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "} {""}{" "}</Text>
                </View>
                {/* row 8 */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell1}> 8 </Text>
                  <Text style={[styles.tableCell2, { textAlign: "left" }]}>
                    {" "}
                    {dataPay?.product1?.[4]?.auction_product_start_event }{" "}
                  </Text>
                  <Text style={styles.tableCell3}>{" "} {dataPay?.product1?.[4]?.auction_product_start_event_count }{" "} </Text>
                  <Text style={styles.tableCell4}> {" "} {dataPay?.product1?.[4]?.auction_product_start_event_cat_count }{" "} </Text>
                  <Text style={styles.tableCell6}> {" "}{""} {" "}</Text>
                </View>
                {/* สรุปรวม */}
                <View style={styles.tableRow}>
                  <Text style={styles.tableCellsum}> {" "}{`( ${THBText(dataPay?.auction_report_price)} )`}{" "}  </Text>
                  <Text style={styles.tableCell3}>{""}  </Text>
                  <Text style={styles.tableCell4}> รวมเป็นเงิน  </Text>
                  <Text style={styles.tableCell6}> {" "}{Number(dataPay?.auction_report_price).toLocaleString()}{" "}</Text>
                </View>
              </View>
              <View style={styles.flexrow}>
              <View style={[
                  styles.flexrowstart,
                  {width:"67%"}
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
                    ผู้รับของ:{" "}
                  </Text>
                  <Text
                    style={[
                      styles.mtsm,
                      { fontWeight: "light" },
                      { fontFamily: "Sarabun" },
                      { fontSize: "11" },
                      { display:"flex"},
                      { width:"76%"},
                    ]}
                  >
                    ...................................................
                  </Text>
                </View>
  
                <View style={[
                  styles.flexrow,
                  {width:"33%"}
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
                      ผู้ส่งของ:{" "}
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
                      ........................................
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrow}>
              <View style={[
                  styles.flexrowstart,
                  {width:"67%"}
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
                      { width:"76%"},
                    ]}
                  >
                    {dataPay?.auction_report_customer_delivery}.{" "}
                  </Text>
                </View>
  
                <View style={[
                  styles.flexrow,
                  {width:"33%"}
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
                      วันที่รับ:{" "}
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
                      ..........................................
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.flexrowbetween}>
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
                      {display:"flex"},
                      {width:"90%"},
                      styles.mtsm,
                    ]}
                  >
                    {dataPay?.auction_report_q}{" "}
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

export default BillSend_Parmoon;
