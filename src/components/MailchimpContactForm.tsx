import React from "react";
import Mailchimp from "@/components/Mailchimp";

function MailchimpContactForm(_props: any) {
  return (
    <>
      <div>
        <Mailchimp
          action="https://valeriejurado.us2.list-manage.com/contact-form?u=4a1e985219bc367027066386a&form_id=c8dd31bd5f504fe1611088febe4ebd07"
          className="chimp forms"
          fields={[
            {
              name: "FNAME",
              placeholder: "First Name",
              type: "text",
              /*required: true,*/
            },
            {
              name: "LNAME",
              placeholder: "Last Name",
              type: "text",
              /*required: true,*/
            },
            {
              name: "EMAIL",
              placeholder: "email",
              type: "email",
              /*required: true,*/
            },
          ]}
        />
      </div>
    </>
  );
}
export default MailchimpContactForm;
