const contactForm = document.querySelector(".contact-form");
const formButton = contactForm.querySelector("button");

contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    const text = e.target.querySelector(".text");
    formButton.disabled = true;
    try {
        const sendStatus = await sendMail(formData);
        console.log(sendStatus);
        text.innerHTML = sendStatus.message;
        e.target.reset();
    } catch (error) {
        console.log(error);
    } finally {
        formButton.disabled = false;
        setTimeout(() => {
            text.innerHTML = `Don't hesitate to drop me a quick message. I usually respond
                    within 2-3 days.`;
        }, 2000);
    }
});

async function sendMail(formData) {
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Message was not sent");
        }
        const sendStatus = await response.json();
        return sendStatus;
    } catch (error) {
        return Promise.reject(error);
    }
}
