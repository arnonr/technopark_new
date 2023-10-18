export default {
  data() {
    return {
      member_statuses: [
        {
          id: 1,
          value: 1,
          name_th: "บุคลากรคณะวิทยาศาสตร์ มจพ.",
          name_en: "บุคลากรคณะวิทยาศาสตร์ มจพ.",
        },
        {
          id: 2,
          value: 2,
          name_th: "บุคลากรภายในมหาวิทยาลัย",
          name_en: "บุคลากรภายในมหาวิทยาลัย",
        },
        {
          id: 3,
          value: 3,
          name_th: "บุคลากรมหาวิทยาลัยภายนอก",
          name_en: "บุคลากรมหาวิทยาลัยภายนอก",
        },
        {
          id: 4,
          value: 4,
          name_th: "หน่วยงาน ราชการ/รัฐวิสหกิจ",
          name_en: "หน่วยงาน ราชการ/รัฐวิสหกิจ",
        },
        {
          id: 5,
          value: 5,
          name_th: "เอกชน",
          name_en: "เอกชน",
        },
      ],
      period_times: [
        {
          id: 1,
          value: 1,
          name_th: "รอบเช้า (9.00- 12.00)",
          name_en: "9.00- 12.00",
        },
        {
          id: 2,
          value: 2,
          name_th: "รอบบ่าย (13.00- 16.00)",
          name_en: "13.00- 16.00",
        },
        {
          id: 3,
          value: 3,
          name_th: "เต็มวัน (9.00- 16.00)",
          name_en: "9.00- 16.00",
        },
      ],
      booking_statuses: [
        {
          id: 1,
          value: 1,
          name_th: "รออนุมัติ",
          name_en: "Wating",
          color: "info",
        },
        {
          id: 2,
          value: 2,
          name_th: "อนุมัติ",
          name_en: "Approved",
          color: "success",
        },
        {
          id: 3,
          value: 3,
          name_th: "ปฏิเสธ",
          name_en: "Rejected",
          color: "danger",
        },
        {
          id: 4,
          value: 4,
          name_th: "ยกเลิก",
          name_en: "Cancled",
          color: "danger",
        },
        // {
        //   id: 5,
        //   value: 5,
        //   name_th: "แก้ไข",
        //   name_en: "Edit",
        // },
      ],
    };
  },
};
