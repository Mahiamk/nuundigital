import "./testimonial.css";
import testmonial from '../../assets/weeding.jpg'
import pride from '../../assets/pride.jpg'
import cheers from '../../assets/cheers.jpg'

const testimonials = [
{ id: 1, name: "Jemal M.", image: testmonial, review: "ኑኑ ዲጂታል የእኛን የምርት ስም በፈጠራ ዲዛይናቸው እና በሚያስደንቅ አገልግሎታቸው ቀይረውታል!" },
  { id: 2, name: "Sarah K.", image: pride, review: "በNuunDigital ያለው ቡድን ከምንጠብቀው በላይ አልፏል! ሙያዊ ፣ ፈጠራ እና ከፍተኛ ችሎታ ያለው።" },
  { id: 3, name: "Abel L.", image: cheers, review: "Barjaagiilee irraa kaasee hanga gabaa miidiyaa hawaasaatti NuunDigital hunda mudaa malee hojjeta!" },
 ];

const TestimonialSection = () => {
  return (
    <section className="testimonial-section">
        <h2 className="comment">What Our Clients Say</h2>
      <div className="testimonial-container">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <div className="testimonial-title">
              <h3>{testimonial.name}</h3>
            </div>
            <div className="testimonial-stars">★★★★★</div>
            <p className="testimonial-text">&quot;{testimonial.review}&quot;</p>
            <div className="testimonial-profile">
              <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
