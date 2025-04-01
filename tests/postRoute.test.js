import {expect, vi} from "vitest";
import * as postController from "../src/controllers/postController.js";
import * as postService from "../src/services/postService.js";
import { fakeResponse } from "../src/utils/testUtils.js";
import {NotFoundError } from "../src/errors/customErrors.js";
afterEach(() => {
    vi.restoreAllMocks();            
});

describe("createPost Controller", () => {
    it("devrait renvoyer le post cree", async () => {
      // Simule une requête et une réponse
      const req = {
        body: {
          title: "testPost",
          content: "testContent",
          media_link: "https://example.com/image.jpg"
        },
        method: "POST",         
      };
      const res = fakeResponse();
  
      const postData = { post_id: 1, ...req.body, created_at: new Date(), updated_at: new Date() };
      vi.spyOn(postService, "createPost").mockResolvedValue(postData);
  
      await postController.createPost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post crée:",
        data: postData,
      });
      expect(postService.createPost).toHaveBeenCalledWith(req.body);
    });
  
    it("devrait renvoyer 500 en cas d'erreur", async () => {
      // Simule une requête et une réponse
      const req = {
        body: {
          title: "testPost",
          content: "testContent"
        },
        method: "POST",
      };
      const res = fakeResponse();
  
      vi.spyOn(postService, "createPost").mockRejectedValue(new Error("Error creating post"));
  
      await postController.createPost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error creating post" });
      expect(postService.createPost).toHaveBeenCalledWith(req.body);
    });
});

describe("getPosts Controller", () => {
    it("devrait renvoyer tous les posts", async () => {
      const req = {
        method: "GET",
      };
      const res = fakeResponse();
  
      const postsData = [
        { post_id: 1, title: "Post 1", content: "Content 1", media_link: null, created_at: new Date(), updated_at: new Date() },
        { post_id: 2, title: "Post 2", content: "Content 2", media_link: "https://example.com/image.jpg", created_at: new Date(), updated_at: new Date() },
      ];
      vi.spyOn(postService, "getPosts").mockResolvedValue(postsData);
  
      await postController.getPosts(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Posts trouvés:",
        data: postsData,
      });
      expect(postService.getPosts).toHaveBeenCalled();
    });
  
    it("devrait renvoyer 500 en cas d'erreur", async () => {
      const req = {
        method: "GET",
      };
      const res = fakeResponse();
  
      vi.spyOn(postService, "getPosts").mockRejectedValue(new Error("Error getting posts"));
  
      await postController.getPosts(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error getting posts" });
      expect(postService.getPosts).toHaveBeenCalled();
    });
});

describe("getPostById Controller", () => {
    it("devrait renvoyer le post avec l'id specifié", async () => {
      const req = {
        params: { post_id: 1 },
        method: "GET",
      };
      const res = fakeResponse();
  
      const postData = { post_id: 1, title: "Post 1", content: "Content 1", media_link: null, created_at: new Date(), updated_at: new Date() };
      vi.spyOn(postService, "getPostById").mockResolvedValue(postData);
  
      await postController.getPostById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post trouvé:",
        data: postData,
      });
      expect(postService.getPostById).toHaveBeenCalledWith(1);
    });
  
    it("devrait renvoyer 404 si le post n'existe pas", async () => {
      const req = {
        params: { post_id: 999 },
        method: "GET",
      };
      const res = fakeResponse();
  
      vi.spyOn(postService, "getPostById").mockRejectedValue(new NotFoundError("Post non trouvé"));
  
      await postController.getPostById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Post non trouvé" });
      expect(postService.getPostById).toHaveBeenCalledWith(999);
    });
  
    it("devrait renvoyer 500 en cas d'erreur", async () => {
      const req = {
        params: { post_id: "1" },
        method: "GET",
      };
      const res = fakeResponse();
  
      vi.spyOn(postService, "getPostById").mockRejectedValue(new Error("Error getting post"));
  
      await postController.getPostById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error getting post" });
      expect(postService.getPostById).toHaveBeenCalledWith("1");
    });
});

describe("updatePost Controller", () => {
    it("devrait renvoyer le post mis à jour", async () => {
      const req = {
        params: { post_id: "1" },
        body: {
          title: "Updated Post",
          content: "Updated Content",
          media_link: "https://example.com/updated-image.jpg",
        },
        method: "PUT",
      };
      const res = fakeResponse();
  
      const updatedPostData = { 
        post_id: 1, 
        ...req.body, 
        created_at: new Date(), 
        updated_at: new Date() 
      };
      vi.spyOn(postService, "updatePost").mockResolvedValue(updatedPostData);
  
      await postController.updatePost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post mis à jour:",
        data: updatedPostData,
      });
      expect(postService.updatePost).toHaveBeenCalledWith("1", req.body);
    });
  
    it("devrait renvoyer 404 si le post n'existe pas", async () => {
      const req = {
        params: { post_id: "999" },
        body: {
          title: "Updated Post",
          content: "Updated Content",
        },
        method: "PUT",
      };
      const res = fakeResponse();
  
      vi.spyOn(postService, "updatePost").mockRejectedValue(new NotFoundError("Post non trouvé"));
  
      await postController.updatePost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Post non trouvé" });
      expect(postService.updatePost).toHaveBeenCalledWith("999", req.body);
    });
  
    it("devrait renvoyer 500 en cas d'erreur", async () => {
      const req = {
        params: { post_id: "1" },
        body: {
          title: "Updated Post",
          content: "Updated Content",
        },
        method: "PUT",
      };
      const res = fakeResponse();
  
      vi.spyOn(postService, "updatePost").mockRejectedValue(new Error("Error updating post"));
  
      await postController.updatePost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error updating post" });
      expect(postService.updatePost).toHaveBeenCalledWith("1", req.body);
    });
});

describe("deletePost Controller", () => {
    it("devrait renvoyer le post supprimé", async () => {
      const req = {
        params: { post_id: "1" },
        method: "DELETE",
      };
      const res = fakeResponse();
  
      const deletedPostData = { post_id: 1, title: "Post 1", content: "Content 1", media_link: null, created_at: new Date(), updated_at: new Date() };
      vi.spyOn(postService, "deletePost").mockResolvedValue(deletedPostData);
  
      await postController.deletePost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Post supprimé:",
        data: deletedPostData,
      });
      expect(postService.deletePost).toHaveBeenCalledWith("1");
    });
  
    it("devrait renvoyer 404 si le post n'existe pas", async () => {
      const req = {
        params: { post_id: "999" },
        method: "DELETE",
      };
      const res = fakeResponse();
  
      vi.spyOn(postService, "deletePost").mockRejectedValue(new NotFoundError("Post non trouvé"));
  
      await postController.deletePost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Post non trouvé" });
      expect(postService.deletePost).toHaveBeenCalledWith("999");
    });
  
    it("devrait renvoyer 500 en cas d'erreur", async () => {
      const req = {
        params: { post_id: "1" },
        method: "DELETE",
      };
      const res = fakeResponse();
  
      vi.spyOn(postService, "deletePost").mockRejectedValue(new Error("Error deleting post"));
  
      await postController.deletePost(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error deleting post" });
      expect(postService.deletePost).toHaveBeenCalledWith("1");
    });
});
