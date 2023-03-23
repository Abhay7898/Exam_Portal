package com.exam.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.model.exam.Category;
import com.exam.service.CategoryService;
import com.exam.utils.API_Constants;
import com.exam.utils.Constants;

@RestController
@RequestMapping(API_Constants.CATEGORY)
@CrossOrigin
public class CategoryController {

	@Autowired
	CategoryService categoryService;
	
	@PostMapping("/")
	public ResponseEntity<?> addCategory(@RequestBody Category category)  {
		
		Category categoryRespose = categoryService.addCategory(category);
		if(categoryRespose == null) {
			return ResponseEntity.ok(Constants.NO_CATEGORY_FOUND);
		}
		return ResponseEntity.ok(categoryRespose);
	}

	@GetMapping(API_Constants.CATEGORY_ID)
	public Category getCategory(@PathVariable("categoryId") Long categoryId) {
		return categoryService.getCategoryById(categoryId);
	}

	@GetMapping("/")
	public ResponseEntity<?> getCategories() {
		return ResponseEntity.ok(this.categoryService.getCategories()) 	;
	}
	
	@PutMapping("/")
	public Category updateCategory(@RequestBody Category category) {
		return categoryService.updateCategory(category);
	}
	
	@DeleteMapping(API_Constants.CATEGORY_ID)
	public void deleteCategory(@PathVariable("categoryId") Long caLong) {
		this.categoryService.deleteCategory(caLong);
	}
}
