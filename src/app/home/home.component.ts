/*
=============================================
Author      : <ยุทธภูมิ ตวันนา>
Create date : <๒๔/๐๑/๒๕๖๓>
Modify date : <๐๔/๐๑/๒๕๖๓>
Description : <>
=============================================
*/

import { Component, OnInit, AfterViewInit } from '@angular/core';

import { DeviceDetectorService } from 'ngx-device-detector';

import { AppService } from '../app.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
    private deviceService: DeviceDetectorService,
    private appService: AppService
  ) { }

  public project: {} = [
    {
      eventName: {
        th: 'โครงการพัฒนาบุคลากรภาครัฐและเอกชน ประจำปีงบประมาณ พ.ศ.2563 สำนักส่งเสริมและฝึกอบรม มหาวิทยาลัยเกษตรศาสตร์',
        en: 'Khalid Free Spirit World Tour Live in Bangkok 2020'
      },
      registrationDate: {
        startDate: '04/11/2019',
        endDate: '25/08/2020'
      },
      registrationFee: {
        th: '999,999 - 999,999 บาท',
        en: '2,800 - 9,500 baht'
      },
      registrationStatus: 'Y'
    },
    {
      eventName: {
        th: 'หลักสูตรประกาศนียบัตรกฎหมายปกครองและวิธีพิจารณาคดีปกครอง',
        en: 'International Forum on Transforming Productivity for Tomorrow Success'
      },
      registrationDate: {
        startDate: '31/10/2019',
        endDate: '30/06/2020'
      },
      registrationFee: {
        th: '19,000 บาท หรือ 23,000 บาท หรือ 28,000 บาท สำหรับผู้ไม่มีวุฒินิติศาสตร์',
        en: '19,000 baht or 23,000 baht or 28,000 baht for those without legal qualifications'
      },
      registrationStatus: 'Y'
    },
    {
      eventName: {
        th: 'การฝึกอบรมหลักสูตรด้านการประชาสัมพันธ์และสื่อสารมวลชน',
        en: 'Speed Friending: Meet ladies & gents quickly! ( 21-40 ) ( FREE Drink / Hosted ) BA'
      },
      registrationDate: {
        startDate: '11/11/2019',
        endDate: '07/07/2020'
      },
      registrationFee: {
        th: '3,500 - 88,000 บาท',
        en: '3,500 - 88,000 baht'
      },
      registrationStatus: 'Y'
    },
    {
      eventName: {
        th: 'หลักสูตรฝึกอบรมประจำปี 2563 สำนักการศึกษาต่อเนื่อง มหาวิทยาลัยสุโขทัยธรรมาธิราช',
        en: 'Introduce 2020 Taiwan International Student Design Competition',
      },
      registrationDate: {
        startDate: '01/02/2020',
        endDate: '19/12/2020'
      },
      registrationFee: {
        th: '500 - 30,000 บาท',
        en: '500 - 30,000 baht'
      },
      registrationStatus: 'W'
    },
    {
      eventName: {
        th: 'การประเมินประสิทธิภาพเชิงนิเวศเศรษฐกิจของระบบผลิตภัณฑ์ รุ่นที่ 2',
        en: 'FREE WORKSHOP: How to make a Great First Impression'
      },
      registrationDate: {
        startDate: '25/11/2019',
        endDate: '30/01/2020'
      },
      registrationFee: {
        th: '7,000 - 12,000 บาท',
        en: '7,000 - 12,000 baht'
      },
      registrationStatus: 'N'
    },
    {
      eventName: {
        th: 'โครงการฝึกอบรมเชิงปฏิบัติการหลักสูตร การจัดทำคู่มือการปฏิบัติงาน ( Work Manual ) ด้วยการจัดการความรู้เพื่อพัฒนาความก้าวหน้าในสายอาชีพของบุคคลากรและเพิ่มประสิทธิภาพของกระบวนการทำงาน ประจำปีงบประมาณ 2563 รุ่นที่ 15',
        en: 'Free Introduction of Bangkok Meditation - 87 Sukhumvit 52 Alley'
      },
      registrationDate: {
        startDate: '24/08/2018',
        endDate: '27/01/2020'
      },
      registrationFee: {
        th: '3,400 บาท',
        en: '3,400 baht'
      },
      registrationStatus: 'N'
    },
    {
      eventName: {
        th: 'หลักสูตรการปฏิบัติงานสำหรับเจ้าหน้าที่พัสดุมือใหม่หน่วยงานภาครัฐตามพระราชบัญญัติจัดซื้อจัดจ้างและการบริหารพัสดุภาครัฐ พ.ศ.2560 และระเบียบกระทรวงการคลังฯ 2560 และศึกษาประเด็นในการปฏิบัติงานสำหรับระบบ eGP ',
        en: 'Valentine\'s Day Singles Special: Speed Friending for all ages! ( FREE Drink )'
      },
      registrationDate: {
        startDate: '10/10/2019',
        endDate: '14/12/2019'
      },
      registrationFee: {
        th: '3,900 บาท',
        en: '3,900 baht'
      },
      registrationStatus: 'N'
    }
  ];

  ngOnInit() {
  }
}
