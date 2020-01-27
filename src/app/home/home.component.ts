/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๔/๐๑/๒๕๖๓>
Modify date : <๒๔/๐๑/๒๕๖๓>
Description : <>
=============================================
*/

import { Component, OnInit } from '@angular/core';

import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private appService: AppService
  ) { }

  public eventRegistration: {} = [
    {
      name: {
        th: 'โครงการพัฒนาบุคลากรภาครัฐและเอกชน ประจำปีงบประมาณ พ.ศ.2563 สำนักส่งเสริมและฝึกอบรม มหาวิทยาลัยเกษตรศาสตร์',
        en: 'Khalid Free Spirit World Tour Live in Bangkok 2020'
      }
    },
    {
      name: {
        th: 'หลักสูตรประกาศนียบัตรกฎหมายปกครองและวิธีพิจารณาคดีปกครอง',
        en: 'International Forum on Transforming Productivity for Tomorrow Success'
      }
    },
    {
      name: {
        th: 'การฝึกอบรมหลักสูตรด้านการประชาสัมพันธ์และสื่อสารมวลชน',
        en: 'Speed Friending: Meet ladies & gents quickly! (21-40) (FREE Drink/Hosted)BA'
      }
    },
    {
      name: {
        th: 'หลักสูตรฝึกอบรมประจำปี 2563 สำนักการศึกษาต่อเนื่อง มหาวิทยาลัยสุโขทัยธรรมาธิราช',
        en: 'Introduce 2020 Taiwan International Student Design Competition',
      }
    },
    {
      name: {
        th: 'โครงการเขียนสมรรถนะสำหรับการประเมินบุคลากรสายสนับสนุนวิชาการ',
        en: 'FREE WORKSHOP: How to make a Great First Impression'
      }
    },
    {
      name: {
        th: 'การประชุมวิชาการและนำเสนอผลงานวิจัย ผลงานทางวิชาการ โครงการสังคมศาสตร์วิชาการครั้งที่ 16',
        en: 'Free Introduction of Bangkok Meditation - 87 Sukhumvit 52 Alley'
      }
    },
    {
      name: {
        th: 'โครงการอบรมเชิงปฏิบัติการ เข้าถึงเข้าใจเทคนิคการจัดทำแผนบริหารความเสี่ยงตามหลัก (Risk Management Plan) ตามหลัก COSO เพื่อผลักดันการดำเนินงานตามยุทธศาสตร์ขององค์กร ปีงบประมาณ 2563',
        en: 'Valentine\'s Day Singles Special: Speed Friending for all ages! (FREE Drink)'
      }
    }
  ];

  ngOnInit() {
  }
}
