import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ContactUs = () => {
  return (
    <div id="tentang-form" className="contactus-container">
      <div className="contactus-wrapper">
        <div className="contactus-title mb-4">Hubungi Kami</div>
        <Form>
          <Form.Group controlId="fullName">
            <Form.Label>Nama Lengkap</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Nomor Telefon</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          <Form.Group controlId="message">
            <Form.Label>Pesan</Form.Label>
            <Form.Control as="textarea" rows={3} style={{ height: '100px' }} />
          </Form.Group>
          <Button className="w-100">Kirim Pesan</Button>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
