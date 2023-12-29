import { formateDate } from "../../utils/formateDate";

const DoctorAbout = ({ doctor }) => {
  return (
    <div>
      <div>
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Thông tin về:
          <span className="text-irisBlueColor font-bold text-[24px] leading-9">
            {/*_id */} {doctor.name}
          </span>
        </h3>
        <p className="text__para">
          {doctor?.about ||
            `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet,
          adipisci incidunt vitae eos optio quia officia distinctio facere
          reprehenderit placeat tempora corporis odit quisquam beatae vero at
          ab, corrupti ad et sequi dolores! Assumenda ratione illum eius dicta!
          Neque exercitationem ratione nisi doloribus quas cumque ut. Rerum ad
          nisi nesciunt.`}
        </p>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Học vấn
        </h3>

        <ul className="pt-4 md:p-5">
          {doctor.qualifications &&
            doctor.qualifications.map((degree, index) => (
              <li
                key={`${degree.degree}-${degree.institution}-${index}`}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]"
              >
                <div>
                  <span className="text-irisBlueColor text-[15px] leading-6 font-semibold">
                    {formateDate(degree.fromDate)}
                    {" - "}
                    {degree.toDate && formateDate(degree.toDate)}
                  </span>
                  <p className="text-[16px] leading-6 font-medium">
                    {degree.degree}
                  </p>
                </div>
                <p className="text-[14px] leading-5 font-medium">
                  {degree.institution}
                </p>
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-12">
        <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2">
          Kinh nghiệm
        </h3>
        <ul className="grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5">
          {doctor.experiences &&
            doctor.experiences.map((exp, index) => (
              <li
                key={`${exp.position}-${exp.institution}-${index}`}
                className="p-4 rounded bg-[#fff9ea]"
              >
                <span className="text-yellowColor text-[15px] leading-6 font-semibold">
                  {formateDate(exp.fromDate)}
                  {" - "}
                  {exp.toDate && formateDate(exp.toDate)}
                </span>
                <p className="text-[16px] leading-6 font-medium text-textColor">
                  {exp.position}
                </p>
                <p className="text-[14px] leading-5 font-medium text-textColor">
                  {exp.institution}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorAbout;
