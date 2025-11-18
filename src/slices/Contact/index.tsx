"use client";

import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    
    try {
      // Get reCAPTCHA token
      if (!executeRecaptcha) {
        setSubmitStatus({ 
          type: 'error', 
          message: 'reCAPTCHA is not loaded. Please refresh the page and try again.' 
        });
        setIsSubmitting(false);
        return;
      }

      let recaptchaToken = '';
      try {
        recaptchaToken = await executeRecaptcha('contact_form_submit');
        console.log('reCAPTCHA token generated:', recaptchaToken ? 'Token received' : 'Token is empty');
        if (!recaptchaToken) {
          throw new Error('reCAPTCHA token is empty');
        }
      } catch (recaptchaError) {
        console.error('reCAPTCHA error:', recaptchaError);
        setSubmitStatus({ 
          type: 'error', 
          message: 'reCAPTCHA verification failed. Please refresh the page and try again.' 
        });
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.get('MERGE1'),
          lastName: formData.get('MERGE2'),
          email: formData.get('MERGE0'),
          phone: formData.get('MERGE4'),
          service: formData.get('MERGE7'),
          eventDate: formData.get('MERGE8'),
          address1: formData.get('MERGE11'),
          address2: formData.get('MERGE10'),
          details: formData.get('MERGE9'),
          website: formData.get('website'), // Honeypot field
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: result.message || 'Thank you! Your message has been sent successfully.' 
        });
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        console.error('Form submission error:', {
          status: response.status,
          error: result.error,
          details: result.details,
        });
        setSubmitStatus({ 
          type: 'error', 
          message: result.error || 'Failed to send message. Please try again.' 
        });
      }
    } catch (error) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Network error. Please check your connection and try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative bg-white overflow-hidden">
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="py-8"
      >
        {/*BELOW IS THE CUSTOM CODED FORM FROM MAILCHIMP, THIS IS NOT EDITABLE WITHOUT DEVELOPER HELP*/}
        <div className="pt-20 grid grid-cols-1 place-self-center font-body">
          <div className="place-self-center md:w-[40rem]">
            <PrismicRichText field={slice.primary.contact_page_text} />

            <form
              onSubmit={handleSubmit}
              name="contact-form"
              className="validate w-full max-w-3xl mt-8"
              noValidate
            >
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
              
              {/* Honeypot field - hidden from humans, bots will fill it */}
              <input
                type="text"
                name="website"
                id="website"
                tabIndex={-1}
                autoComplete="off"
                style={{
                  position: 'absolute',
                  left: '-9999px',
                  width: '1px',
                  height: '1px',
                  opacity: 0,
                  pointerEvents: 'none'
                }}
                aria-hidden="true"
                defaultValue=""
              />
              
              {/* Status Messages */}
              {submitStatus.type && (
                <div className={`w-full mb-6 p-4 rounded text-center ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  <div>{submitStatus.message}</div>
                  {submitStatus.type === 'error' && (
                    <div className="mt-3 text-sm">
                      Having trouble with the form? Use the Copy Email button below to contact us directly.
                    </div>
                  )}
                </div>
              )}
              
              <div>
                <div className="submit_container clear flex justify-center">
                  <div className="flex">
                    <p className="text-lg pr-1 md:text-2xl">＋</p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="formEmailButton cursor-pointer block w-fit hover:opacity-75 transition-opacity duration-200 ease-in-outtracking-wider text-base tracking-wide underline underline-offset-4 font-display font-medium md:text-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Bounded>
    </section>
  );
};

export default Contact;
