import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import MailchimpContactForm from "@/components/MailchimpContactForm";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="mt-44">
        <MailchimpContactForm />
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: (
            <>
              <iframe
                id="JotFormIFrame-242563921950358"
                title="Appointment Request Form"
                allow="geolocation; microphone; camera; fullscreen"
                src="https://form.jotform.com/242563921950358"
                className="min-width:100%;max-width:100%;height:539px;border:none;"
                scrolling="no"
              ></iframe>
              <script src="https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js"></script>
              <script>
                window.jotformEmbedHandler("iframe[id='JotFormIFrame-242563921950358']",
                "https://form.jotform.com/")
              </script>{" "}
            </>
          ),
        }}
      />
    </section>
  );
};

export default Contact;
