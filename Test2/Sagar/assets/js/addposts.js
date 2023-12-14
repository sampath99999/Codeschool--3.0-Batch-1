async function addposts() {
    event.preventDefault();
    const form = document.getElementById("myform");
    const formData = new FormData(form);
  
    try {
      const response = await fetch("./api/addposts.php", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.success) {
        console.log("Form submitted successfully:", result.data);
        location.href = "./dashboard.html";
        window.location.href = "./dashboard.html";
      } else {
        console.error("Form submission failed:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }