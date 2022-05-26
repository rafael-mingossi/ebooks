import styles from './styles.module.scss';
import { PageHeader } from '/src/components';

const Privacy = () => {
  return (
    <div className={styles.container}>
      <PageHeader title={'Privacy Policy'} />
      <p>
        WHAT DO WE DO WITH YOUR INFORMATION? <br /> When you register in our
        website, as part of the register process, we collect the personal
        information you give us such as your name, address, phone number and
        email address. When you browse our website, we also automatically
        receive your computer’s internet protocol (IP) address in order to
        provide us with information that helps us learn about your browser and
        operating system. <br />
        <br />
        CONSENT <br />
        How do you get my consent? When you provide us with personal information
        to register in our website, we imply that you consent to our collecting
        it and using it for that specific reason only. If we ask for your
        personal information for a secondary reason, like marketing, we will
        either ask you directly for your expressed consent, or provide you with
        an opportunity to say no. How do I withdraw my consent? If after you
        opt-in, you change your mind, you may withdraw your consent for us to
        contact you, for the continued collection, use or disclosure of your
        information, at any time, by contacting us at helpall.library@gmail.com
        <br />
        <br />
        DISCLOSURE <br />
        We may disclose your personal information if we are required by law to
        do so or if you violate our Terms of Service. <br />
        <br />
        SECURITY <br />
        To protect your personal information, we take reasonable precautions and
        follow industry best practices to make sure it is not inappropriately
        lost, misused, accessed, disclosed, altered or destroyed. If you provide
        us with your credit card information, the information is encrypted using
        secure socket layer technology (SSL) and stored with a AES-256
        encryption. Although no method of transmission over the Internet or
        electronic storage is 100% secure, we follow all PCI-DSS requirements
        and implement additional generally accepted industry standards. <br />
        <br />
        AGE OF CONSENT <br />
        By using this site, you represent that you are at least the age of
        majority in your state or province of residence, or that you are the age
        of majority in your state or province of residence, and you have given
        us your consent to allow any of your minor dependents to use this site.
        <br />
        <br />
        CHANGES TO THIS PRIVACY POLICY <br />
        We reserve the right to modify this privacy policy at any time, so
        please review it frequently. Changes and clarifications will take effect
        immediately upon their posting on the website. If we make material
        changes to this policy, we will notify you here that it has been
        updated, so that you are aware of what information we collect, how we
        use it, and under what circumstances, if any, we use and/or disclose it.
        If our store is acquired or merged with another company, your
        information may be transferred to the new owners so that we may continue
        to sell products to you. <br />
        <br />
        QUESTIONS AND CONTACT INFORMATION <br />
        If you would like to: access, correct, amend or delete any personal
        information we have about you, register a complaint, or simply want more
        information contact our Privacy Compliance Officer at
        helpall.library@gmail.com
      </p>
    </div>
  );
};

export default Privacy;
