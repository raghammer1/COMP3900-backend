# UI/UX Design Principles and Implementations

## 1. Consistency

We ensure consistency in our design, meaning that similar elements behave in similar ways. This reduces learning time and confusion for the users. Our application maintains consistency in navigation, color schemes, font styles, button shapes, and overall layout.

- **Navigation**: All navigation elements are positioned consistently across different pages.
- **Color Schemes**: We use a consistent color palette throughout the application to maintain visual coherence.
- **Font Styles**: The same font family and sizes are used for headings, body text, and labels.
- **Button Shapes**: All buttons have a consistent shape and size to ensure a uniform look.
- **Layout**: The overall layout is designed to be consistent, with similar spacing and alignment rules applied across all screens.

## 2. Simplicity

We minimize the cognitive load on users by eliminating unnecessary elements or content that doesn’t support user tasks.

- **Editing Stage**: We add a border to each textbox while the user is in the editing stage for better understandability. This border is removed when the user is in presentation mode.
- **Minimalism**: Only essential elements are displayed, and complex interactions are simplified to make the user experience straightforward.

## 3. Visibility

We ensure that everything is easily visible to the user.

- **Flip Animation**: We use flip animations so that the font color of presentation thumbnails does not get hidden due to the image on the thumbnail, ensuring that the text remains readable.

## 4. Feedback

Every action that a user takes on the app provides immediate feedback.

- **Instant Alerts**: When a user adds or deletes a slide, an instant alert message appears, confirming the action with messages like "Successfully deleted" or "Successfully added a slide."

## 5. Conservation of Energy

Our interface reduces the amount of effort users need to put in to complete tasks.

- **Unified Edit Button**: When adding a new element, there is a single edit button from where all slide display actions can be handled, and all properties related to that element can be set in the same modal.
- **Range Scrolls**: Percentages are displayed using range scrolls to ensure users cannot input a value larger than 100 or lower than 0, simplifying input validation.

## 6. Wording

All components and buttons in the app have been named with careful consideration to ensure clarity.

- **Clear Labels**: Button labels clearly describe their actions, ensuring users understand their functionality at a glance.

## 7. Familiarity

We use design patterns that users are familiar with and understand already.

- **Interactive Titles**: To change the title or properties of a presentation, users can hover over the title, which underlines to indicate interactability.

## 8. Usability

We have added features to enhance the usability of the application.

- **Slides List**: A slides list is provided so that users can easily understand the configuration of their presentation, including how many slides there are and which slide they are deleting.

## 9. Button Tooltips

Buttons are disabled with a tooltip on hover to inform users of the form requirements.

- **Disabled Buttons**: When a button is disabled, hovering over it shows a tooltip explaining why it is disabled, helping users understand the requirements needed to enable the button.

## 10. Improved Navigation

We have implemented keyboard navigation for a more user-friendly experience.

- **Arrow Key Navigation**: Instead of using arrow buttons, we have implemented right and left arrow key navigation for a better experience during slideshow presentations.

## 11. Image Preview

When adding an image to a slide, a preview of the image is shown.

- **Image Preview**: This ensures users know that the image was successfully loaded, providing immediate visual feedback.

---

By adhering to these design principles, we aim to provide a user-friendly, intuitive, and efficient e-invoicing application that meets the needs of SMEs and enhances their experience in managing supply-chain relationships.
