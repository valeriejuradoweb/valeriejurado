import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
      >
        {/*BELOW IS THE CUSTOM CODED FORM FROM MAILCHIMP, THIS IS NOT EDITABLE WITHOUT DEVELOPER HELP*/}
        <div className="mt-20 grid grid-cols-1 place-self-center font-body">
          <div className="place-self-center md:w-[40rem]">
            <PrismicRichText field={slice.primary.contact_page_text} />

            <form
              action="https://valeriejurado.us2.list-manage.com/subscribe/post"
              method="post"
              id={process.env.REACT_APP_MAILCHIMP_CONTACT_FORM_ID}
              name="contact-form"
              className="validate w-full max-w-3xl mt-8"
              target="_self"
              /*noValidate=""*/
            >
              <input
                type="hidden"
                name="u"
                className="hidden"
                value={process.env.REACT_APP_MAILCHIMP_CONTACT_FORM_U}
              />
              <input
                type="hidden"
                name="id"
                className="hidden"
                value={process.env.REACT_APP_MAILCHIMP_CONTACT_FORM_ID}
              />
              <div className="flex flex-wrap">
                <div className="w-full mb-5 md:pr-4 md:w-1/2">
                  <input
                    type="text"
                    name="MERGE1"
                    id="MERGE1"
                    aria-label="first name"
                    placeholder="First Name"
                    className="w-[100%] required h-[50px] border border-black p-4 text-gray-900"
                    defaultValue=""
                  />
                </div>

                <div className="w-full mb-5 md:mb-0 md:w-1/2">
                  <input
                    type="text"
                    name="MERGE2"
                    id="MERGE2"
                    aria-label="last name"
                    placeholder="Last Name"
                    className="w-[100%] required h-[50px] border border-black p-4 text-gray-900"
                    defaultValue=""
                  />
                </div>
              </div>
              <div className="flex flex-wrap mb-5">
                <input
                  type="email"
                  autoCapitalize="off"
                  autoCorrect="off"
                  name="MERGE0"
                  id="MERGE0"
                  aria-label="email"
                  placeholder="Email"
                  className="required w-full block h-[50px] border border-black p-4 text-gray-900"
                  defaultValue=""
                />
              </div>
              <div className="flex flex-wrap mb-6">
                <input
                  type="text"
                  name="MERGE4"
                  id="MERGE4"
                  aria-label="phone number"
                  placeholder="Phone Number"
                  className="h-[50px] w-full block border border-black p-4 text-gray-900"
                  defaultValue=""
                />
              </div>

              <div className="flex flex-wrap">
                <div className="w-full mb-5 md:pr-4 md:w-1/2">
                  <label htmlFor="MERGE7">Requested Service</label>
                  <div className="field-group border border-black p-4">
                    <select
                      className="select-large w-[100%]"
                      id="MERGE7"
                      name="MERGE7"
                    >
                      <option value="Event">Event</option>
                      <option value="Custom Project">Custom Project</option>
                      <option value="Plant Installation">
                        Plant Installation
                      </option>
                      <option value="Recurring Service">
                        Recurring Service
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="w-full mb-5 md:w-1/2">
                  <label htmlFor="MERGE8">Date of Event</label>
                  <div className="field-group">
                    <div className="datefield">
                      <input
                        type="text"
                        name="MERGE8"
                        defaultValue=""
                        placeholder="MM/DD/YYYY"
                        data-dojo-props="constraints:{datePattern:'M/d/y'}"
                        data-dojo-type="dijit/form/DateTextBox"
                        className="field-group w-[100%] border border-black p-4 text-gray-900"
                      />
                      <span className="calendar-icon" id="MERGE8-popup" />
                    </div>
                  </div>
                </div>
              </div>

              <label htmlFor="MERGE11">Event Address</label>
              <div className="flex flex-wrap mb-4">
                <input
                  type="text"
                  name="MERGE11"
                  id="MERGE11"
                  aria-label="address line 1"
                  placeholder="Address Line 1"
                  className="h-[50px] w-full block border border-black p-4 text-gray-900"
                  defaultValue=""
                />
              </div>
              <div className="flex flex-wrap mb-6">
                <input
                  type="text"
                  name="MERGE10"
                  id="MERGE10"
                  aria-label="address line 2"
                  placeholder="Address Line 2"
                  className="h-[50px] w-full block border border-black p-4 text-gray-900"
                  defaultValue=""
                />
              </div>
              <div className="flex flex-wrap mb-5">
                <textarea
                  name="MERGE9"
                  id="MERGE9"
                  aria-label="details"
                  placeholder="Details"
                  className="w-full border border-black p-4 text-gray-900"
                  defaultValue=""
                ></textarea>
              </div>
              <div>
                <div className="submit_container clear flex justify-center">
                  <div className="flex">
                    <p className="text-lg pr-1 md:text-2xl">＋</p>
                    <input
                      type="submit"
                      className="formEmailButton cursor-pointer block w-fit hover:opacity-75 transition-opacity duration-200 ease-in-outtracking-wider text-base tracking-wide underline underline-offset-4 font-display font-medium md:text-xl"
                      name="submit"
                      defaultValue="Submit"
                    />
                  </div>
                </div>
                <input
                  type="hidden"
                  name="ht"
                  defaultValue="9eadbb992f74677afe1916ef5542b886d6d91b7a:MTcyNjY2OTUzNC4yOTM3"
                />
                <input
                  type="hidden"
                  name="mc_signupsource"
                  defaultValue="hosted"
                />
              </div>
            </form>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Contact;
