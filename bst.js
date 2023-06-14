class node{
    constructor(key, parent = null){
        this.key = key;
        this.parent = parent;
        this.left = null;
        this.right = null;
        this.height = null; //only for avl trees
    }
}

class bst{
    constructor(root){
        this.root = new node(root);
    }
    insert(element){
        let x = this.root;
        let y = null;
        while(x != null){
            y = x;
            if(element < x.key){
                x = x.left;
            }else{
                x = x.right;
            }
        }
        if(y == null){
            this.root = new node(element);
        }else if(element > y.key){
            y.right = new node(element, y);
            console.log("new node ", y.right.key);
            return y.right;
        }else{
            y.left = new node(element, y);
            console.log("new node ", y.left.key);
            return y.left;
        }
    }
    search(key, node = this.root){
        if(node == null || key == node.key) return node;
        if(key < node.key){
            return this.search(key, node.left);
        }else{
            return this.search(key, node.right);
        }
    }
    min(startnode){
        let x = startnode;
        let y = null;
        while(x!=null){
            y = x;
            x = x.left;
        }
        return y;
    }
    max(startnode){
        let x = startnode;
        let y = null;
        while(x!=null){
            y = x;
            x = x.right;
        }
        return y;
    }
    predecessor(node){
        if(node.left != null){
            return this.max(node.left);
        }
        let x = node;
        let y = node.parent;
        while(y!=null && x == y.left){
            x = y;
            y = y.parent;
        }
        return y;
    }
    successor(node){
        if(node.right != null){
            return this.min(node.right);
        }
        let x = node;
        let y = node.parent;
        while(y!=null && x == y.right){
            x = y;
            y = y.parent;
        }
        return y;
    }
    replace(x, y){ //source of problem maybe
        if(x.parent == null){
            this.root = y;
        }else if(x == x.parent.left){
            x.parent.left = y;
            console.log("92 red");
        }else{
            console.log("95 red");
            x.parent.right = y;
            console.log(x.parent.right);
        }
        if(y != null && x.parent != y){ //after the && only for testing 
            y.parent = x.parent;
        }
    }
    remove(node){ //delete is a reserved keyword?
        if(node.left == null && node.right == null){ //deleting a leaf node
            this.replace(node, null);
            console.log("removed leaf node ", node.key);
            return null;
        }
        if(node.left == null || node.right == null){ //deleting node /w one child
            let child = null;
            if(node.left == null){
                child = node.right;
            }else{
                child = node.left;
            }
            this.replace(node, child);
            console.log("removed node w 1 child ", node.key);
            return child;
        }
        //if the node has two children 
        let y = this.successor(node);
        node.key = y.key;
        console.log("called a remove w 2 children ", node.key); 
        return this.remove(y); //can and sometimes should get recursive
        /*if(y.parent != node){
            this.replace(y, y.right);
            y.right = node.right;
            y.right.parent = y;
        }
        this.replace(node, y);
        y.left = node.left;
        y.left.parent = y;
        return y;
        node.key = y.key;
        console.log("recursive call for remove w 2 children");
        return this.remove(y);*/
    }
    inorderTraversal(node = this.root){
        if(node == null || node == undefined){
            console.log("null");
            return;
        }else{
            if(node.left != null)this.inorderTraversal(node.left);
            console.log(node.key);
            if(node.right != null)this.inorderTraversal(node.right);
        }
   } 
}

class avl extends bst{
    constructor(root){
        super(root);
        console.log("new tree with root ", this.root.key);
    }
    getHeight(node){
        if(node == null){
            return -1;
        }
        //console.log("getHeight called from ", node.key);
        if(node.height != null){ 
            return node.height;
        }else{
            return node.height = 1+Math.max(this.getHeight(node.left), this.getHeight(node.right));
            //return node.height;
        }
    }
    getBalance(node){
        if(node == null){
            return 0;
        }         
        return this.getHeight(node.right)-this.getHeight(node.left); //positive is right heavy 
    }
    findFirstUnbalanced(node){
        if(node == this.root){
            return Math.abs(this.getBalance(node)) == 2 ? node : 0; //0 means no unbalanced nodes 
        }
        if(Math.abs(this.getBalance(node.parent)) == 2){
            return node.parent;
        }else{
            if(node!=null){
                return this.findFirstUnbalanced(node.parent);
            }
        }
    }
    balance(node){
        if(this.getBalance(node) == -2){ //left heavy
            if(this.getBalance(node.left) <= 0){
                //left left case
                return this.rotateRight(node);
            }else{
                //left right case
                this.rotateLeft(node.left);
                return this.rotateRight(node);
            }
        }
        if(this.getBalance(node) == 2){ //right heavy
            if(this.getBalance(node.right) >= 0){
                //right right
                return this.rotateLeft(node);
            }else{
                //right left
                this.rotateRight(node.right);
                return this.rotateLeft(node);
            }
        }
    }
    update(node){
        let i = node;
        while(i != null){ //trickles down to the tree root and sets heights to null so they can be recomputed
            i.height = null;
            //console.log(i.parent);
            i = i.parent;
        }
        this.getHeight(this.root); //updates all node heights
        this.balance(this.findFirstUnbalanced(node));
    }
    insert(element){
        let inserted = super.insert(element);
        this.update(inserted);
        return inserted;
    }
    superRemove(node){
        super.remove(node);
    }
    remove(node){
        let removed = super.remove(node); //actually the node in the place of the removed one
        //console.log("in place of removed.right ", removed.right);
        //console.log("removed parent ", removed.parent.key);
        //this.update(removed);
        return removed;
    }
    rotateRight(node){
        console.log("rortight ", node.key);
        console.log("x left left key ",node.left.left.key);
        let x = node;
        let y = x.left;
        let p = x.parent;
        if(y.right != null){
            x.left = y.right;
            x.left.parent = x;
            console.log("red 236 ", y.right.parent.key);
        }else{
            x.left = null;
        }
        y.right = x;
        x.parent = y;
        y.parent = p;
        if(p != null){
            if(p.left == x){
                p.left = y;
            }else{
                p.right = y;
            }
        }else{
            this.root = y;
        }
        return y;
    }
    rotateLeft(node){
        let x = node;
        let y = x.right;
        let p = x.parent;
        if(y.left != null){
            x.right = y.left;
            x.right.parent = x;
        }else{
            x.right = null;
        }
        y.left = x;
        x.parent = y;
        y.parent = p;
        if(p != null){
            if(p.left == x){
                p.left = y;
            }else{
                p.right = y;
            }
        }else{
            this.root = y;
        }
        return y;
    }
}

