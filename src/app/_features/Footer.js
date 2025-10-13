import { Mail } from "../_icons/mail";
import { Phone } from "../_icons/phone";

export const Footer = () => {
  return (
    <div className="pt-[50px]">
      <div className="box-border bg-[#4338CA] w-full h-[280px]">
        <div className="flex justify-around">
          <div className="pt-[40px]">
            <img src="/Movielogo.png" />
            <p className="text-white text-[16px] font-normal pt-[12px]">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>
          <div className="pt-[40px]">
            <p className="text-white text-[14px] font-normal">
              Contact Impormation
            </p>
            <div className="flex gap-[12px]">
              <div className="pt-[24px]">
                <Mail />
              </div>
              <div className="pt-[12px]">
                <p className="text-white">
                  Email: <br /> support@movieZ.com
                </p>
              </div>
            </div>
            <div className="flex gap-[12px] pt-[12px]">
              <div className="pt-[12px]">
                <Phone />
              </div>
              <p className="text-white">
                Phone: <br /> +976 (11) 123-4567
              </p>
            </div>
          </div>
          <div className="pt-[40px]">
            <p className="text-white text-[14px] font-normal">Follow Us</p>
            <div className="flex gap-[12px] pt-[12px]">
              <p className="text-white text-[14px font-medium]">Facebook</p>
              <p className="text-white">Instagram</p>
              <p className="text-white"> Twitter</p>
              <p className="text-white">Youtube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
