import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import LogoFullWhiteLg from "@/components/LogoFullWhiteLg";

export default async function Footer() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <footer>
      <section className="relative">
        {prismic.isFilled.image(settings.data.footer_background_image) && (
          <PrismicNextImage
            field={settings.data.footer_background_image}
            alt=""
            fill={true}
            className="pointer-events-none select-none object-cover -z-50 md:block"
          />
        )}

        <div className="text-white grid grid-cols-1 place-items-center text-center font-body p-10">
          <div className="pb-2">
            <>{settings.data.footer_form_label}</>
          </div>
          {/*SECOND MAILCHIMP FORM BELOW, CONVERTED JSX FROM MAILCHIMP GENERATED HTML EMBED FORM*/}
          <div id="mc_embed_shell" className="">
            <div id="mc_embed_signup">
              <form
                action="https://valeriejurado.us2.list-manage.com/subscribe/post?u=4a1e985219bc367027066386a&id=a1fd1262ff&f_id=00b36de0f0"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate"
                target="_self"
                /*noValidate=""*/
              >
                <div id="mc_embed_signup_scroll">
                  {/*<div className="indicates-required">
                    <span className="asterisk">*</span> indicates required
                  </div>*/}
                  <div className="mc-field-group">
                    {/*<label htmlFor="mce-EMAIL">
                      Email Address <span className="asterisk">*</span>
                    </label>*/}
                    <input
                      type="email"
                      name="EMAIL"
                      aria-label="email address"
                      placeholder="Enter your email address"
                      className="required email h-[50px] w-[280px] border border-white p-4 bg-black text-white"
                      id="mce-EMAIL"
                      /*required=""*/
                      defaultValue=""
                    />
                  </div>
                  <div className="hidden">
                    <input type="hidden" name="tags" defaultValue={1538740} />
                  </div>
                  <div id="mce-responses" className="clear">
                    <div
                      className="response hidden"
                      id="mce-error-response"
                      /*style={{ display: "none" }}*/
                    />
                    <div
                      className="response hidden"
                      id="mce-success-response"
                      /*style={{ display: "none" }}*/
                    />
                  </div>
                  <div
                    aria-hidden="true"
                    className="absolute left-[-5000px]"
                    /*style={{ position: "absolute", left: "-5000px" }}*/
                  >
                    <input
                      type="text"
                      name="b_4a1e985219bc367027066386a_a1fd1262ff"
                      tabIndex={-1}
                      defaultValue=""
                    />
                  </div>
                  <div className="font-body clear text-white md:text-xl pt-2">
                    <input
                      type="submit"
                      name="subscribe"
                      id="mc-embedded-subscribe"
                      className="button underline underline-offset-4"
                      defaultValue="sign up"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="pt-8 space-y-6">
            <div className="py-6">
              <Link href="/">
                <LogoFullWhiteLg />
              </Link>
            </div>

            <ul className="underline underline-offset-4 md:text-xl">
              {settings.data.navigation.map(({ link, label }) => (
                <li key={label}>
                  <PrismicNextLink field={link}>{label}</PrismicNextLink>
                </li>
              ))}
            </ul>
            <p>
              © {new Date().getFullYear()} {settings.data.site_title}
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
