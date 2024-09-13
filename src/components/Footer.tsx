import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Link from "next/link";
import GoldLgLogo from "./GoldLgLogo";

export default async function Footer() {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return (
    <footer>
      <section className="relative  md:h-[20rem]">
        {prismic.isFilled.image(settings.data.footer_background_image) && (
          <PrismicNextImage
            field={settings.data.footer_background_image}
            alt=""
            fill={true}
            className="pointer-events-none select-none object-cover -z-50 md:block"
          />
        )}
        <div className="text-white">
          {/*MAILCHIMP FORM BELOW, CONVERTED JSX FROM MAILCHIMP GENERATED HTML EMBED FORM*/}
          <div className="text-center font-body">
            <>{settings.data.footer_form_label}</>
            <div id="mc_embed_shell" className="pt-10">
              <div id="mc_embed_signup">
                <form
                  action="https://valeriejurado.us2.list-manage.com/subscribe/post?u=4a1e985219bc367027066386a&id=a1fd1262ff&f_id=00836de0f0"
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  className="validate"
                  target="_self"
                >
                  <div id="mc_embed_signup_scroll">
                    <div className="mc-field-group">
                      <label htmlFor="mce-EMAIL" className="hidden">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="EMAIL"
                        className="required email h-[40px] border border-white p-4 bg-black text-white"
                        id="mce-EMAIL"
                        defaultValue=""
                      />
                    </div>
                    <div>
                      <input type="hidden" name="tags" defaultValue={1538740} />
                    </div>
                    <div id="mce-responses" className="clear">
                      <div
                        className="response hidden"
                        id="mce-error-response"
                      />
                      <div
                        className="response hidden"
                        id="mce-success-response"
                      />
                    </div>
                    <div
                      className="absolute hidden pl-[-5000px]"
                      aria-hidden="true"
                    >
                      <input
                        type="text"
                        name="b_4a1e985219bc367027066386a_a1fd1262ff"
                        tabIndex={-1}
                        defaultValue=""
                      />
                    </div>
                    <div className="clear text-white">
                      <input
                        type="submit"
                        name="subscribe"
                        id="mc-embedded-subscribe"
                        className="button"
                        defaultValue="Sign Up"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <Link href="/">
              <GoldLgLogo />
            </Link>

            <p>
              © {new Date().getFullYear()} {settings.data.site_title}
            </p>

            <ul>
              {settings.data.navigation.map(({ link, label }) => (
                <li key={label}>
                  <PrismicNextLink field={link}>{label}</PrismicNextLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </footer>
  );
}
