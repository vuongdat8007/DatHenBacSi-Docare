import { formateDate } from '../../utils/formateDate'

const DoctorAbout = () => {
  return (
    <div>
        <div>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                Thông tin về
                <span className='text-irisBlueColor font-bold text-[24px] leading-9'>Nguyễn Đình Chung Anh</span>
            </h3>
            <p className="text__para">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, adipisci incidunt vitae eos optio quia officia distinctio facere reprehenderit placeat tempora corporis odit quisquam beatae vero at ab, corrupti ad et sequi dolores! Assumenda ratione illum eius dicta! Neque exercitationem ratione nisi doloribus quas cumque ut. Rerum ad nisi nesciunt.
            </p>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                Học vấn
            </h3>

            <ul className='pt-4 md:p-5'>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formateDate('04-12-2010')} - {formateDate('08-25-2010')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium'>
                            PhD trong Giải Phẫu
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium'>
                            Cambridge Uni., New Hampshire, UK
                    </p>
                </li>
                <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]'>
                    <div>
                        <span className='text-irisBlueColor text-[15px] leading-6 font-semibold'>
                            {formateDate('12-15-2016')}
                        </span>
                        <p className='text-[16px] leading-6 font-medium'>
                            Đoạt giải Nobel Y Học: Khám phá cơ chế phân tử kiểm soát nhịp sinh học
                        </p>
                    </div>
                    <p className='text-[14px] leading-5 font-medium'>
                        Viện Hàn lâm Khoa học Hoàng gia Thụy Điển
                    </p>
                </li>

            </ul>
        </div>

        <div className='mt-12'>
            <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                Kinh nghiệm
            </h3>
            <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('08-02-2005')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Bác Sĩ nội trú ICU
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Bệnh Viện Nhân Dân Gia Định
                    </p>
                </li>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('08-06-2007')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Bác Sĩ Ngoại Thần Kinh
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Bệnh Viện Nhân Dân Gia Định
                    </p>
                </li>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('02-20-2009')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Trưởng Khoa Ngoại Thần Kinh
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Bệnh Viện Nhân Dân Gia Định
                    </p>
                </li>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('08-02-2011')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Bác Sĩ nội trú ICU
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Bệnh Viện Chợ Rẫy
                    </p>
                </li>
                <li className='p-4 rounded bg-[#fff9ea]'>
                    <span className='text-yellowColor text-[15px] leading-6 font-semibold'>
                        {formateDate('08-02-2012')}
                    </span>
                    <p className='text-[16px] leading-6 font-medium text-textColor'>
                            Trưởng khoa Thần Kinh - Nhi Khoa
                    </p>
                    <p className='text-[14px] leading-5 font-medium text-textColor'>
                        Bệnh Viện Chợ Rẫy
                    </p>
                </li>
            </ul>
        </div>

    </div>
  )
}

export default DoctorAbout