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

              <div
                className="mergeRow dojoDndItem mergeRow-address"
                id="mergeRow-3"
              >
                {/*Below is the Event Address Fields - very large - could consider taking countries out*/}
                <label htmlFor="MERGE3">Event Address</label>
                <div className="field-group">
                  <div className="field-wrapper mb-7">
                    {" "}
                    <div className="addressfield">
                      {" "}
                      <div className="flex flex-wrap mb-3">
                        <span className="subfield addr1field w-[100%]">
                          {" "}
                          {/*<label htmlFor="MERGE3-addr1">Street Address</label>*/}{" "}
                          <input
                            type="text"
                            id="MERGE3-addr1"
                            name="MERGE3[addr1]"
                            defaultValue=""
                            placeholder="Street Address"
                            className="av-text h-[50px] w-full block border border-black p-4 text-gray-900"
                          />{" "}
                        </span>{" "}
                      </div>
                      <div className="flex flex-wrap mb-3">
                        <span className="subfield addr2field w-[100%]">
                          {" "}
                          {/*<label htmlFor="MERGE3-addr2">Address Line 2</label>*/}{" "}
                          <input
                            type="text"
                            id="MERGE3-addr2"
                            name="MERGE3[addr2]"
                            defaultValue=""
                            placeholder="Address Line 2"
                            className="av-text h-[50px] w-full block border border-black p-4 text-gray-900"
                          />{" "}
                        </span>{" "}
                      </div>
                      <div className="flex flex-wrap mb-3">
                        <span className="subfield cityfield borderbox w-[100%]">
                          {" "}
                          {/*<label htmlFor="MERGE3-city">City</label>*/}{" "}
                          <input
                            type="text"
                            id="MERGE3-city"
                            name="MERGE3[city]"
                            defaultValue=""
                            placeholder="City"
                            className="av-text w-[100%] h-[50px] border border-black p-4 text-gray-900"
                          />{" "}
                        </span>{" "}
                      </div>
                      <div className="flex flex-wrap">
                        <div className="w-full md:w-1/2 mb-3 md:pr-4 md:mb-0">
                          <span className="subfield statefield borderbox">
                            {" "}
                            {/*<label htmlFor="MERGE3-state">
                          State/Prov/Region
                        </label>{" "}*/}
                            <input
                              type="text"
                              id="MERGE3-state"
                              name="MERGE3[state]"
                              defaultValue=""
                              placeholder="State/Prov/Region"
                              className="av-text h-[50px] w-full border border-black p-4 text-gray-900"
                            />{" "}
                          </span>{" "}
                        </div>
                        <div className="w-full md:w-1/2 mb-3">
                          <span className="subfield zipfield borderbox">
                            {" "}
                            {/*<label htmlFor="MERGE3-zip">Postal/Zip</label>{" "}*/}
                            <input
                              type="text"
                              id="MERGE3-zip"
                              name="MERGE3[zip]"
                              defaultValue=""
                              placeholder="Postal/Zip"
                              className="av-text h-[50px] w-full border border-black p-4 text-gray-900"
                            />{" "}
                          </span>{" "}
                        </div>
                      </div>
                      <div className="flex flex-wrap mb-5">
                        <span className="subfield countryfield w-full">
                          {" "}
                          {/*<label htmlFor="MERGE3-country">Country</label>{" "}*/}
                          <select
                            className="select-large w-full border border-black p-4 text-gray-900"
                            aria-label="select-country"
                            id="MERGE3-country"
                            name="MERGE3[country]"
                          >
                            {" "}
                            <option value={164} /*selected="selected"*/>
                              USA
                            </option>
                            <option value={286}>Aaland Islands</option>
                            <option value={274}>Afghanistan</option>
                            <option value={2}>Albania</option>
                            <option value={3}>Algeria</option>
                            <option value={178}>American Samoa</option>
                            <option value={4}>Andorra</option>
                            <option value={5}>Angola</option>
                            <option value={176}>Anguilla</option>
                            <option value={175}>Antigua And Barbuda</option>
                            <option value={6}>Argentina</option>
                            <option value={7}>Armenia</option>
                            <option value={179}>Aruba</option>
                            <option value={8}>Australia</option>
                            <option value={9}>Austria</option>
                            <option value={10}>Azerbaijan</option>
                            <option value={11}>Bahamas</option>
                            <option value={12}>Bahrain</option>
                            <option value={13}>Bangladesh</option>
                            <option value={14}>Barbados</option>
                            <option value={15}>Belarus</option>
                            <option value={16}>Belgium</option>
                            <option value={17}>Belize</option>
                            <option value={18}>Benin</option>
                            <option value={19}>Bermuda</option>
                            <option value={20}>Bhutan</option>
                            <option value={21}>Bolivia</option>
                            <option value={325}>
                              Bonaire, Saint Eustatius and Saba
                            </option>
                            <option value={22}>Bosnia and Herzegovina</option>
                            <option value={23}>Botswana</option>
                            <option value={181}>Bouvet Island</option>
                            <option value={24}>Brazil</option>
                            <option value={180}>Brunei Darussalam</option>
                            <option value={25}>Bulgaria</option>
                            <option value={26}>Burkina Faso</option>
                            <option value={27}>Burundi</option>
                            <option value={28}>Cambodia</option>
                            <option value={29}>Cameroon</option>
                            <option value={30}>Canada</option>
                            <option value={31}>Cape Verde</option>
                            <option value={32}>Cayman Islands</option>
                            <option value={33}>Central African Republic</option>
                            <option value={34}>Chad</option>
                            <option value={35}>Chile</option>
                            <option value={36}>China</option>
                            <option value={185}>Christmas Island</option>
                            <option value={37}>Colombia</option>
                            <option value={204}>Comoros</option>
                            <option value={38}>Congo</option>
                            <option value={318}>
                              Congo, Democratic Republic of the
                            </option>
                            <option value={183}>Cook Islands</option>
                            <option value={268}>Costa Rica</option>
                            <option value={275}>Cote D'Ivoire</option>
                            <option value={40}>Croatia</option>
                            <option value={298}>Curacao</option>
                            <option value={41}>Cyprus</option>
                            <option value={42}>Czech Republic</option>
                            <option value={43}>Denmark</option>
                            <option value={44}>Djibouti</option>
                            <option value={289}>Dominica</option>
                            <option value={187}>Dominican Republic</option>
                            <option value={45}>Ecuador</option>
                            <option value={46}>Egypt</option>
                            <option value={47}>El Salvador</option>
                            <option value={48}>Equatorial Guinea</option>
                            <option value={49}>Eritrea</option>
                            <option value={50}>Estonia</option>
                            <option value={51}>Ethiopia</option>
                            <option value={189}>Falkland Islands</option>
                            <option value={191}>Faroe Islands</option>
                            <option value={52}>Fiji</option>
                            <option value={53}>Finland</option>
                            <option value={54}>France</option>
                            <option value={193}>French Guiana</option>
                            <option value={277}>French Polynesia</option>
                            <option value={56}>Gabon</option>
                            <option value={57}>Gambia</option>
                            <option value={58}>Georgia</option>
                            <option value={59}>Germany</option>
                            <option value={60}>Ghana</option>
                            <option value={194}>Gibraltar</option>
                            <option value={61}>Greece</option>
                            <option value={195}>Greenland</option>
                            <option value={192}>Grenada</option>
                            <option value={196}>Guadeloupe</option>
                            <option value={62}>Guam</option>
                            <option value={198}>Guatemala</option>
                            <option value={270}>Guernsey</option>
                            <option value={63}>Guinea</option>
                            <option value={64}>Guinea-Bissau</option>
                            <option value={65}>Guyana</option>
                            <option value={200}>Haiti</option>
                            <option value={66}>Honduras</option>
                            <option value={67}>Hong Kong</option>
                            <option value={68}>Hungary</option>
                            <option value={69}>Iceland</option>
                            <option value={70}>India</option>
                            <option value={71}>Indonesia</option>
                            <option value={279}>Iraq</option>
                            <option value={74}>Ireland</option>
                            <option value={323}>Isle of Man</option>
                            <option value={75}>Israel</option>
                            <option value={76}>Italy</option>
                            <option value={202}>Jamaica</option>
                            <option value={78}>Japan</option>
                            <option value={288}>
                              Jersey (Channel Islands)
                            </option>
                            <option value={79}>Jordan</option>
                            <option value={80}>Kazakhstan</option>
                            <option value={81}>Kenya</option>
                            <option value={203}>Kiribati</option>
                            <option value={82}>Kuwait</option>
                            <option value={83}>Kyrgyzstan</option>
                            <option value={84}>
                              Lao People's Democratic Republic
                            </option>
                            <option value={85}>Latvia</option>
                            <option value={86}>Lebanon</option>
                            <option value={87}>Lesotho</option>
                            <option value={88}>Liberia</option>
                            <option value={281}>Libya</option>
                            <option value={90}>Liechtenstein</option>
                            <option value={91}>Lithuania</option>
                            <option value={92}>Luxembourg</option>
                            <option value={208}>Macau</option>
                            <option value={93}>Macedonia</option>
                            <option value={94}>Madagascar</option>
                            <option value={95}>Malawi</option>
                            <option value={96}>Malaysia</option>
                            <option value={97}>Maldives</option>
                            <option value={98}>Mali</option>
                            <option value={99}>Malta</option>
                            <option value={207}>Marshall Islands</option>
                            <option value={210}>Martinique</option>
                            <option value={100}>Mauritania</option>
                            <option value={212}>Mauritius</option>
                            <option value={241}>Mayotte</option>
                            <option value={101}>Mexico</option>
                            <option value={102}>Moldova, Republic of</option>
                            <option value={103}>Monaco</option>
                            <option value={104}>Mongolia</option>
                            <option value={290}>Montenegro</option>
                            <option value={294}>Montserrat</option>
                            <option value={105}>Morocco</option>
                            <option value={106}>Mozambique</option>
                            <option value={242}>Myanmar</option>
                            <option value={107}>Namibia</option>
                            <option value={215}>Nauru</option>
                            <option value={108}>Nepal</option>
                            <option value={109}>Netherlands</option>
                            <option value={110}>Netherlands Antilles</option>
                            <option value={213}>New Caledonia</option>
                            <option value={111}>New Zealand</option>
                            <option value={112}>Nicaragua</option>
                            <option value={113}>Niger</option>
                            <option value={114}>Nigeria</option>
                            <option value={217}>Niue</option>
                            <option value={214}>Norfolk Island</option>
                            <option value={116}>Norway</option>
                            <option value={117}>Oman</option>
                            <option value={118}>Pakistan</option>
                            <option value={222}>Palau</option>
                            <option value={282}>Palestine</option>
                            <option value={119}>Panama</option>
                            <option value={219}>Papua New Guinea</option>
                            <option value={120}>Paraguay</option>
                            <option value={121}>Peru</option>
                            <option value={122}>Philippines</option>
                            <option value={221}>Pitcairn</option>
                            <option value={123}>Poland</option>
                            <option value={124}>Portugal</option>
                            <option value={126}>Qatar</option>
                            <option value={315}>Republic of Kosovo</option>
                            <option value={127}>Reunion</option>
                            <option value={128}>Romania</option>
                            <option value={130}>Rwanda</option>
                            <option value={205}>Saint Kitts and Nevis</option>
                            <option value={206}>Saint Lucia</option>
                            <option value={324}>Saint Martin</option>
                            <option value={237}>
                              Saint Vincent and the Grenadines
                            </option>
                            <option value={132}>Samoa (Independent)</option>
                            <option value={227}>San Marino</option>
                            <option value={255}>Sao Tome and Principe</option>
                            <option value={133}>Saudi Arabia</option>
                            <option value={134}>Senegal</option>
                            <option value={326}>Serbia</option>
                            <option value={135}>Seychelles</option>
                            <option value={136}>Sierra Leone</option>
                            <option value={137}>Singapore</option>
                            <option value={302}>Sint Maarten</option>
                            <option value={138}>Slovakia</option>
                            <option value={139}>Slovenia</option>
                            <option value={223}>Solomon Islands</option>
                            <option value={140}>Somalia</option>
                            <option value={141}>South Africa</option>
                            <option value={257}>
                              South Georgia and the South Sandwich Islands
                            </option>
                            <option value={142}>South Korea</option>
                            <option value={311}>South Sudan</option>
                            <option value={143}>Spain</option>
                            <option value={144}>Sri Lanka</option>
                            <option value={293}>Sudan</option>
                            <option value={146}>Suriname</option>
                            <option value={225}>
                              Svalbard and Jan Mayen Islands
                            </option>
                            <option value={147}>Swaziland</option>
                            <option value={148}>Sweden</option>
                            <option value={149}>Switzerland</option>
                            <option value={152}>Taiwan</option>
                            <option value={260}>Tajikistan</option>
                            <option value={153}>Tanzania</option>
                            <option value={154}>Thailand</option>
                            <option value={233}>Timor-Leste</option>
                            <option value={155}>Togo</option>
                            <option value={232}>Tonga</option>
                            <option value={234}>Trinidad and Tobago</option>
                            <option value={156}>Tunisia</option>
                            <option value={157}>Turkiye</option>
                            <option value={158}>Turkmenistan</option>
                            <option value={287}>
                              Turks &amp; Caicos Islands
                            </option>
                            <option value={235}>Tuvalu</option>
                            <option value={159}>Uganda</option>
                            <option value={161}>Ukraine</option>
                            <option value={162}>United Arab Emirates</option>
                            <option value={262}>United Kingdom</option>
                            <option value={163}>Uruguay</option>
                            <option value={165}>Uzbekistan</option>
                            <option value={239}>Vanuatu</option>
                            <option value={166}>
                              Vatican City State (Holy See)
                            </option>
                            <option value={167}>Venezuela</option>
                            <option value={168}>Vietnam</option>
                            <option value={169}>
                              Virgin Islands (British)
                            </option>
                            <option value={238}>Virgin Islands (U.S.)</option>
                            <option value={188}>Western Sahara</option>
                            <option value={170}>Yemen</option>
                            <option value={173}>Zambia</option>
                            <option value={174}>Zimbabwe</option>{" "}
                          </select>{" "}
                        </span>{" "}
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mb-5">
                {/*<input
              type="text"
              name="MERGE9"
              id="MERGE9"
              aria-label="details"
              placeholder="Details"
              className="h-[50px] border border-black p-4 text-gray-900"
              defaultValue=""
            />*/}
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
                <div className="submit_container clear place-self-end">
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
