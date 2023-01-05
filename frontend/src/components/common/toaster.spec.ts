import Toast from "vue-toastification";
import Vue from "vue";
import Toaster from "./toaster.type";


describe("toaster.type.ts", () => {
  
  beforeEach(() => {
    
    Vue.use(Toast, {
      position: "bottom-left",
      transition: "Vue-Toastification__fade",
      closeOnClick: false,
    });
  });
  
  it('should call the toast', () => {
    const toaster = Toaster;
    const spy = vi.spyOn(toaster, "toast");
    expect(spy)
      .toHaveBeenCalledTimes(0);
    Toaster.toast("foo");
    expect(spy)
      .toHaveBeenCalled();
    expect(spy)
      .toHaveBeenCalledTimes(1);
  });
});